const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const apiRoutes = require('./routes');
const { testConnection } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 데이터베이스 연결 테스트
testConnection();

// 미들웨어 설정
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ 
    message: 'Summer Project API Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API 라우트
app.use('/api', apiRoutes);

// 404 에러 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`Auth endpoints: http://localhost:${PORT}/api/auth/*`);
  console.log(`User endpoints: http://localhost:${PORT}/api/users/*`);
});