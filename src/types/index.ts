// 사용자 타입
export interface User {
  id: number;
  username: string;
  email: string;
  profile_img_url?: string;
  created_at: string;
}

// 아티스트 타입
export interface Artist {
  id: number;
  name: string;
  image_url: string;
  genre: string;
  bio: string;
  instagram_url?: string;
  youtube_url?: string;
  spotify_url?: string;
  created_at: string;
}

// 커뮤니티 타입
export interface Community {
  id: number;
  type: "genre" | "artist";
  title: string;
  related_id: number;
  created_by: number;
  created_at: string;
}

// 게시글 타입
export interface Post {
  id: number;
  community_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  is_deleted: boolean;
  user?: User;
  community?: Community;
}

// 댓글 타입
export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  is_deleted: boolean;
  user?: User;
}

// AI 추천 타입
export interface AIRecommendation {
  id: number;
  user_id: number;
  mood: "happy" | "sad" | "angry" | "excited" | "calm" | "energetic";
  situation: string;
  result_json: string;
  created_at: string;
}

// 추천 트랙 타입
export interface RecommendedTrack {
  track_id: number;
  title: string;
  artist: string;
  cover_url: string;
  stream_url: string;
  reason: string;
} 