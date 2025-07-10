const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');
const artistRoutes = require('./artists');
const communityRoutes = require('./communities');
const postRoutes = require('./posts');
const aiRoutes = require('./ai');

const router = express.Router();

// API 라우트
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/artists', artistRoutes);
router.use('/communities', communityRoutes);
router.use('/posts', postRoutes);
router.use('/ai', aiRoutes);

// API 상태 확인
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;