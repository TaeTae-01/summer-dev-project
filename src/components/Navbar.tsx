import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        DIGIDING
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">홈</Link>
        <Link to="/artists" className="navbar-link">아티스트</Link>
        <Link to="/communities" className="navbar-link">커뮤니티</Link>
        <Link to="/ai-recommend" className="navbar-link">AI 추천</Link>
        <Link to="/login" className="navbar-link">로그인</Link>
        <Link to="/register" className="navbar-link">회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar; 