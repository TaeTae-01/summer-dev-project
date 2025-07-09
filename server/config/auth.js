const jwt = require('jsonwebtoken');

const authConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key-here',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};

const generateToken = (payload) => {
  return jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.expiresIn });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, authConfig.secret, { expiresIn: authConfig.refreshExpiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, authConfig.secret);
};

module.exports = {
  authConfig,
  generateToken,
  generateRefreshToken,
  verifyToken
};