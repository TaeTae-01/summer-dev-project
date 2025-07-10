import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArtistPage from "./pages/ArtistPage";
import CommunityPage from "./pages/CommunityPage";
import AIRecommendPage from "./pages/AIRecommendPage";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-pretendard">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/artists" element={<ArtistPage />} />
            <Route path="/artists/:id" element={<ArtistPage />} />
            <Route path="/communities" element={<CommunityPage />} />
            <Route path="/communities/:id" element={<CommunityPage />} />
            <Route path="/ai-recommend" element={<AIRecommendPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
