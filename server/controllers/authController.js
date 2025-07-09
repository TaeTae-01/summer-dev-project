/**
 * 인증 관련 컨트롤러
 * 회원가입, 로그인, 사용자 정보 조회 등의 인증 로직을 처리
 */

const User = require('../models/User');
const { generateToken } = require('../config/auth');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * 회원가입 처리
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 이미 존재하는 사용자 확인 (이메일 중복 체크)
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return sendError(res, 'Email already exists', 400);
    }

    // 새 사용자 생성 (비밀번호는 User 모델에서 자동으로 해싱됨)
    const user = await User.create({ email, password, username });
    
    // JWT 토큰 생성
    const token = generateToken({ id: user.id, email: user.email });

    // 성공 응답 (비밀번호 제외한 사용자 정보와 토큰 반환)
    sendSuccess(res, {
      user: user.toJSON(),
      token
    }, 'User registered successfully', 201);

  } catch (error) {
    console.error('Register error:', error);
    sendError(res, 'Registration failed', 500);
  }
};

/**
 * 로그인 처리
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 이메일로 사용자 찾기
    const user = await User.findByEmail(email);
    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // 비밀번호 확인 (bcrypt를 사용하여 해시된 비밀번호와 비교)
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // JWT 토큰 생성
    const token = generateToken({ id: user.id, email: user.email });

    // 성공 응답 (사용자 정보와 토큰 반환)
    sendSuccess(res, {
      user: user.toJSON(),
      token
    }, 'Login successful');

  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Login failed', 500);
  }
};

/**
 * 현재 로그인된 사용자 정보 조회
 * 인증 미들웨어를 통해 검증된 사용자의 정보를 반환
 * @param {Object} req - Express 요청 객체 (req.user에 인증된 사용자 정보 포함)
 * @param {Object} res - Express 응답 객체
 */
const getMe = async (req, res) => {
  try {
    // 인증 미들웨어에서 설정한 사용자 ID로 사용자 조회
    const user = await User.findById(req.user.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    // 비밀번호 제외한 사용자 정보 반환
    sendSuccess(res, user.toJSON(), 'User data retrieved');
  } catch (error) {
    console.error('Get me error:', error);
    sendError(res, 'Failed to get user data', 500);
  }
};

// 다른 파일에서 사용할 수 있도록 함수들 내보내기
module.exports = {
  register,
  login,
  getMe
};