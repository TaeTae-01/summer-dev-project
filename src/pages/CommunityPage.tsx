import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { communityAPI, postAPI } from "../services/api";
import type { Community, Post } from "../types";

const CommunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await communityAPI.getAll();
        setCommunities(response.data);
        if (response.data.length > 0) {
          const postsResponse = await communityAPI.getPosts(response.data[0].id);
          setPosts(postsResponse.data);
        }
      } catch (error) {
        console.error("커뮤니티 정보를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
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
      <h1 className="section-title">커뮤니티</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
        {communities.map((community) => (
          <div key={community.id} className="card">
            <h3 style={{ color: "var(--color-primary-glow)", marginBottom: "0.5rem" }}>{community.title}</h3>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>타입: {community.type}</p>
            <p style={{ fontSize: "0.9rem" }}>생성일: {new Date(community.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      
      {posts.length > 0 && (
        <div style={{ marginTop: "3rem" }}>
          <h2 className="section-title" style={{ fontSize: "1.5rem" }}>게시글</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {posts.map((post) => (
              <div key={post.id} className="card">
                <h3 style={{ color: "var(--color-primary-glow)", marginBottom: "0.5rem" }}>{post.title}</h3>
                <p style={{ marginBottom: "0.5rem" }}>{post.content}</p>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "0.8rem" }}>
                  작성일: {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage; 