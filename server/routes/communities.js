const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// 모든 커뮤니티 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, type, title, related_id, created_by, created_at
      FROM communities
      WHERE is_deleted = false
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({
      success: false,
      message: '커뮤니티 정보를 불러오는데 실패했습니다.'
    });
  }
});

// 특정 커뮤니티 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT id, type, title, related_id, created_by, created_at
      FROM communities
      WHERE id = ? AND is_deleted = false
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '커뮤니티를 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({
      success: false,
      message: '커뮤니티 정보를 불러오는데 실패했습니다.'
    });
  }
});

// 커뮤니티의 게시글 조회
router.get('/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT p.id, p.community_id, p.user_id, p.title, p.content, p.created_at, p.is_deleted,
             u.username, u.email
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.community_id = ? AND p.is_deleted = false
      ORDER BY p.created_at DESC
    `, [id]);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    res.status(500).json({
      success: false,
      message: '게시글을 불러오는데 실패했습니다.'
    });
  }
});

module.exports = router; 