import React, { useState } from "react";
import { aiAPI } from "../services/api";

const AIRecommendPage: React.FC = () => {
  const [formData, setFormData] = useState({
    mood: "",
    situation: "",
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
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
      const response = await aiAPI.getRecommendation(formData.mood, formData.situation);
      setRecommendations(response.data.recommendations || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "AI 추천을 받는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="section-title">AI 음악 추천</h1>
      
      <div className="card">
        <h2 style={{ color: "var(--color-primary-glow)", marginBottom: "1rem" }}>추천 받기</h2>
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
          
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>
              현재 기분
            </label>
            <select
              className="input"
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              required
            >
              <option value="">기분을 선택하세요</option>
              <option value="happy">행복</option>
              <option value="sad">슬픔</option>
              <option value="angry">화남</option>
              <option value="excited">신남</option>
              <option value="calm">차분함</option>
              <option value="energetic">활기참</option>
            </select>
          </div>
          
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>
              상황
            </label>
            <input
              className="input"
              type="text"
              name="situation"
              placeholder="예: 운동할 때, 공부할 때, 드라이브할 때..."
              value={formData.situation}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            className="btn" 
            type="submit"
            disabled={loading}
          >
            {loading ? "추천 중..." : "AI 추천 받기"}
          </button>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2 className="section-title" style={{ fontSize: "1.5rem" }}>추천 결과</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
            {recommendations.map((track, index) => (
              <div key={index} className="card">
                <h3 style={{ color: "var(--color-primary-glow)", marginBottom: "0.5rem" }}>{track.title}</h3>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>{track.artist}</p>
                <p style={{ fontSize: "0.9rem" }}>{track.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendPage; 