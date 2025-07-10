import axios from "axios";
import type { User, Artist, Community, Post, Comment, AIRecommendation } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 사용자 관련 API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post("/auth/register", { username, email, password }),
  getProfile: () => api.get("/auth/profile"),
};

// 아티스트 관련 API
export const artistAPI = {
  getAll: () => api.get<Artist[]>("/artists"),
  getById: (id: number) => api.get<Artist>(`/artists/${id}`),
};

// 커뮤니티 관련 API
export const communityAPI = {
  getAll: () => api.get<Community[]>("/communities"),
  getById: (id: number) => api.get<Community>(`/communities/${id}`),
  getPosts: (id: number) => api.get<Post[]>(`/communities/${id}/posts`),
};

// 게시글 관련 API
export const postAPI = {
  create: (data: { community_id: number; title: string; content: string }) =>
    api.post("/posts", data),
  getById: (id: number) => api.get<Post>(`/posts/${id}`),
  getComments: (id: number) => api.get<Comment[]>(`/posts/${id}/comments`),
  addComment: (postId: number, content: string) =>
    api.post(`/posts/${postId}/comments`, { content }),
};

// AI 추천 관련 API
export const aiAPI = {
  getRecommendation: (mood: string, situation: string) =>
    api.post("/ai/recommend", { mood, situation }),
};

export default api; 