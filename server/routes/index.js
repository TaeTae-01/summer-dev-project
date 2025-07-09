const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');

const router = express.Router();

// API 라우트
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

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