const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// 게시글 생성
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { community_id, title, content } = req.body;
    const user_id = req.user.id;
    
    const [result] = await pool.query(`
      INSERT INTO posts (community_id, user_id, title, content, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `, [community_id, user_id, title, content]);
    
    res.status(201).json({
      success: true,
      message: '게시글이 생성되었습니다.',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: '게시글 생성에 실패했습니다.'
    });
  }
});

// 특정 게시글 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT p.id, p.community_id, p.user_id, p.title, p.content, p.created_at, p.is_deleted,
             u.username, u.email
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.id = ? AND p.is_deleted = false
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '게시글을 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      success: false,
      message: '게시글을 불러오는데 실패했습니다.'
    });
  }
});

// 게시글의 댓글 조회
router.get('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.is_deleted,
             u.username, u.email
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ? AND c.is_deleted = false
      ORDER BY c.created_at ASC
    `, [id]);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: '댓글을 불러오는데 실패했습니다.'
    });
  }
});

// 댓글 추가
router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;
    
    const [result] = await pool.query(`
      INSERT INTO comments (post_id, user_id, content, created_at)
      VALUES (?, ?, ?, NOW())
    `, [id, user_id, content]);
    
    res.status(201).json({
      success: true,
      message: '댓글이 추가되었습니다.',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: '댓글 추가에 실패했습니다.'
    });
  }
});

module.exports = router; 