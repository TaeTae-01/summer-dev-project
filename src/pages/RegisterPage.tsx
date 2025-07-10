import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      await authAPI.register(formData.username, formData.email, formData.password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 24 }}>회원가입</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              backgroundColor: "rgba(239, 68, 68, 0.1)", 
              border: "1px solid rgba(239, 68, 68, 0.3)", 
              color: "#ef4444", 
              padding: "12px 16px", 
              borderRadius: "8px",
              marginBottom: "16px"
            }}>
              {error}
            </div>
          )}
          <input
            className="input"
            type="text"
            name="username"
            placeholder="사용자명"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button 
            className="btn" 
            type="submit" 
            style={{ width: "100%", marginTop: 8 }}
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ color: "var(--color-text-secondary)" }}>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" style={{ color: "var(--color-primary-glow)", textDecoration: "none" }}>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 