/**
 * 데이터베이스 연결 설정 파일
 * MySQL 데이터베이스에 연결하기 위한 연결 풀 설정
 */

const mysql = require('mysql2/promise');

// 데이터베이스 연결 설정
// 환경변수에서 값을 읽어오거나 기본값 사용
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',        // 데이터베이스 서버 주소
  user: process.env.DB_USER || 'root',             // 데이터베이스 사용자명
  password: process.env.DB_PASSWORD || '',         // 데이터베이스 비밀번호
  database: process.env.DB_NAME || 'diggiding',   // 사용할 데이터베이스명
  waitForConnections: true,                       // 연결이 사용 가능할 때까지 대기
  connectionLimit: 10,                            // 동시 연결 가능한 최대 연결 수
  queueLimit: 0                                   // 대기열에 대기할 수 있는 최대 요청 수 (0 = 무제한)
};

// 데이터베이스 연결 풀 생성
// 연결 풀을 사용하여 성능을 향상시키고 연결 관리를 자동화
const pool = mysql.createPool(dbConfig);

/**
 * 데이터베이스 연결 테스트 함수
 * 애플리케이션 시작 시 데이터베이스 연결 상태를 확인
 */
const testConnection = async () => {
  try {
    // 연결 풀에서 연결 하나를 가져오기
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    
    // 연결을 다시 풀에 반납 (중요: 메모리 누수 방지)
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

// 다른 파일에서 사용할 수 있도록 연결 풀과 테스트 함수 내보내기
module.exports = { pool, testConnection };