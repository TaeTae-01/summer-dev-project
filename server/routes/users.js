const express = require('express');
const { updateProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// 모든 사용자 라우트는 인증 필요
router.use(authenticateToken);

// 프로필 업데이트
router.put('/profile', updateProfile);

// 비밀번호 변경
router.put('/password', changePassword);

// 계정 삭제
router.delete('/account', deleteAccount);

module.exports = router;