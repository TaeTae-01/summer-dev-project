const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// 모든 아티스트 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, name, image_url, genre, bio, instagram_url, youtube_url, spotify_url, created_at
      FROM artists
      WHERE is_deleted = false
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({
      success: false,
      message: '아티스트 정보를 불러오는데 실패했습니다.'
    });
  }
});

// 특정 아티스트 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT id, name, image_url, genre, bio, instagram_url, youtube_url, spotify_url, created_at
      FROM artists
      WHERE id = ? AND is_deleted = false
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: '아티스트를 찾을 수 없습니다.'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({
      success: false,
      message: '아티스트 정보를 불러오는데 실패했습니다.'
    });
  }
});

module.exports = router; 