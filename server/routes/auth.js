const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// 회원가입
router.post('/register', validateRegister, register);

// 로그인
router.post('/login', validateLogin, login);

// 현재 사용자 정보 (인증 필요)
router.get('/me', authenticateToken, getMe);

// 로그아웃 (클라이언트에서 토큰 삭제)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Logout successful. Please remove token from client.' 
  });
});

module.exports = router;