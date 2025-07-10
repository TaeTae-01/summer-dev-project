const { sendError } = require('../utils/response');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // 최소 6자, 문자와 숫자 포함
  return password && password.length >= 6;
};

const validateRegister = (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return sendError(res, 'Email, password, and username are required', 400);
  }

  if (!validateEmail(email)) {
    return sendError(res, 'Invalid email format', 400);
  }

  if (!validatePassword(password)) {
    return sendError(res, 'Password must be at least 6 characters', 400);
  }

  if (username.trim().length < 2) {
    return sendError(res, 'Username must be at least 2 characters', 400);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, 'Email and password are required', 400);
  }

  if (!validateEmail(email)) {
    return sendError(res, 'Invalid email format', 400);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateEmail,
  validatePassword
};