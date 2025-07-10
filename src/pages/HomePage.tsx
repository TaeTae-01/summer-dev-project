import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1 className="section-title" style={{ textAlign: "center", marginTop: 40 }}>
        DIGIDING에 오신 것을 환영합니다!
      </h1>
      <div className="card" style={{ textAlign: "center", marginBottom: 32 }}>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-secondary)" }}>
          음악을 사랑하는 모두를 위한 <span style={{ color: "var(--color-primary-glow)", fontWeight: 600 }}>일렉트로닉 커뮤니티</span>.<br/>
          아티스트 정보, 커뮤니티, AI 음악 추천까지 한 곳에서!
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
        <div className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
          <h2 className="section-title" style={{ fontSize: "1.3rem", marginBottom: 12 }}>아티스트</h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>
            다양한 아티스트의 프로필과 음악을 탐색해보세요.
          </p>
          <Link to="/artists" className="btn">아티스트 보러가기</Link>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
          <h2 className="section-title" style={{ fontSize: "1.3rem", marginBottom: 12 }}>커뮤니티</h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>
            장르별, 아티스트별로 소통하는 공간!
          </p>
          <Link to="/communities" className="btn">커뮤니티 입장</Link>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 260, maxWidth: 320 }}>
          <h2 className="section-title" style={{ fontSize: "1.3rem", marginBottom: 12 }}>AI 음악 추천</h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 16 }}>
            AI가 당신의 기분과 상황에 맞는 음악을 추천해줍니다.
          </p>
          <Link to="/ai-recommend" className="btn">AI 추천 받기</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 