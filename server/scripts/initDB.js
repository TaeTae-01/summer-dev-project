// 데이터베이스 초기화 스크립트
// 이 스크립트는 diggiding 데이터베이스를 생성하고 초기 데이터를 설정합니다.

const { pool } = require('../config/database');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

/**
 * 데이터베이스 초기화 함수
 * 1. diggiding 데이터베이스 생성
 * 2. users 테이블 생성
 * 3. 관리자 계정 및 더미 사용자 생성
 */
async function initDatabase() {
  try {
    // 데이터베이스 생성 (데이터베이스 없이 연결)
    // 데이터베이스가 존재하지 않는 경우에만 생성
    const mysql = require('mysql2/promise');
    // 데이터베이스 없이 MySQL 서버에 연결
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    // diggiding 데이터베이스 생성 (이미 존재하는 경우 무시)
    await connection.execute('CREATE DATABASE IF NOT EXISTS diggiding');
    console.log('Database "diggiding" created successfully');
    await connection.end();
    
    // 데이터베이스 스키마 생성
    // schema.sql 파일에서 users 테이블 생성 쿼리 읽기
    const schemaPath = path.join(__dirname, '../config/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // users 테이블 생성 (이미 존재하는 경우 무시)
    await pool.execute(schema);
    console.log('Database schema created successfully');
    
    // 기존 데이터 삭제 (재실행 시 중복 방지)
    // 테스트 환경에서 깔끔한 초기화를 위해 기존 사용자 데이터 모두 삭제
    await pool.execute('DELETE FROM users');
    console.log('Existing data cleared');
    
    // 관리자 계정 생성
    // 비밀번호를 bcrypt로 해싱 (salt rounds: 12)
    const adminPassword = await bcrypt.hash('1234', 12);
    await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      ['admin', 'admin@example.com', adminPassword]
    );
    console.log('Admin account created');
    
    // 더미 사용자 데이터 생성
    // 프론트엔드 개발 및 테스트를 위한 샘플 사용자 계정들
    const dummyUsers = [
      { username: 'test1', email: 'test1@example.com', password: 'test1234' },
      { username: 'test2', email: 'test2@example.com', password: 'test1234' },
      { username: 'test3', email: 'test3@example.com', password: 'test1234' },
      { username: 'test4', email: 'test4@example.com', password: 'test1234' },
      { username: 'test5', email: 'test5@example.com', password: 'test1234' }
    ];
    
    // 각 더미 사용자의 비밀번호를 해싱하여 데이터베이스에 저장
    for (const user of dummyUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      await pool.execute(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [user.username, user.email, hashedPassword]
      );
    }
    
    console.log('Dummy users created successfully');
    console.log('Total users in database:', dummyUsers.length + 1);
    
    await pool.end();
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
}

initDatabase();