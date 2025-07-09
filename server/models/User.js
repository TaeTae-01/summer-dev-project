/**
 * User 모델 클래스
 * 사용자 데이터베이스 작업을 처리하는 모델
 */

const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  /**
   * User 클래스 생성자
   * @param {Object} data - 데이터베이스에서 조회된 사용자 데이터
   */
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.password_hash = data.password_hash;
    this.created_at = data.created_at;
  }

  /**
   * 새로운 사용자 생성
   * @param {Object} userData - 사용자 데이터 (email, password, username)
   * @returns {Promise<User>} 생성된 사용자 객체
   */
  static async create(userData) {
    const { email, password, username } = userData;
    
    // 비밀번호를 bcrypt로 해싱 (salt rounds: 12)
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // 데이터베이스에 사용자 정보 삽입
    const [result] = await pool.execute(
      'INSERT INTO users (email, password_hash, username) VALUES (?, ?, ?)',
      [email, hashedPassword, username]
    );
    
    // 생성된 사용자의 ID로 사용자 객체 반환
    return this.findById(result.insertId);
  }

  /**
   * ID로 사용자 찾기
   * @param {number} id - 사용자 ID
   * @returns {Promise<User|null>} 찾은 사용자 객체 또는 null
   */
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    // 결과가 있으면 User 객체 생성, 없으면 null 반환
    return rows.length > 0 ? new User(rows[0]) : null;
  }

  /**
   * 이메일로 사용자 찾기
   * @param {string} email - 사용자 이메일
   * @returns {Promise<User|null>} 찾은 사용자 객체 또는 null
   */
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    // 결과가 있으면 User 객체 생성, 없으면 null 반환
    return rows.length > 0 ? new User(rows[0]) : null;
  }

  /**
   * 비밀번호 확인
   * @param {string} password - 확인할 비밀번호 (평문)
   * @returns {Promise<boolean>} 비밀번호 일치 여부
   */
  async comparePassword(password) {
    // bcrypt를 사용하여 평문 비밀번호와 해시된 비밀번호 비교
    return await bcrypt.compare(password, this.password_hash);
  }

  /**
   * 사용자 정보 업데이트
   * @param {Object} updateData - 업데이트할 데이터 (username, password)
   * @returns {Promise<User>} 업데이트된 사용자 객체
   */
  async update(updateData) {
    const fields = [];
    const values = [];
    
    // 사용자명 업데이트
    if (updateData.username) {
      fields.push('username = ?');
      values.push(updateData.username);
    }
    
    // 비밀번호 업데이트 (해싱 후 저장)
    if (updateData.password) {
      fields.push('password_hash = ?');
      values.push(await bcrypt.hash(updateData.password, 12));
    }
    
    // 업데이트할 필드가 없으면 현재 객체 반환
    if (fields.length === 0) return this;
    
    // WHERE 조건에 사용할 사용자 ID 추가
    values.push(this.id);
    
    // 데이터베이스 업데이트 실행
    await pool.execute(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    // 업데이트된 사용자 정보를 다시 조회하여 반환
    return User.findById(this.id);
  }

  /**
   * 비밀번호 제외한 사용자 정보 반환
   * JSON 직렬화 시 비밀번호 해시를 제외하여 보안성 향상
   * @returns {Object} 비밀번호가 제외된 사용자 정보
   */
  toJSON() {
    const { password_hash, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;