import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { artistAPI } from "../services/api";
import type { Artist } from "../types";

const ArtistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await artistAPI.getAll();
        setArtists(response.data);
      } catch (error) {
        console.error("아티스트 정보를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">아티스트</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
        {artists.map((artist) => (
          <div key={artist.id} className="card">
            <img 
              src={artist.image_url} 
              alt={artist.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "1rem" }}
            />
            <h3 style={{ color: "var(--color-primary-glow)", marginBottom: "0.5rem" }}>{artist.name}</h3>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>{artist.genre}</p>
            <p style={{ fontSize: "0.9rem" }}>{artist.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage; 