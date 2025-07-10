import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    try {
      const response = await authAPI.login(formData.email, formData.password);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="card" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: 24 }}>로그인</h2>
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
          <button 
            className="btn" 
            type="submit" 
            style={{ width: "100%", marginTop: 8 }}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 