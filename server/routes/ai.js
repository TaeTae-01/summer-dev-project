const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// AI 음악 추천
router.post('/recommend', authenticateToken, async (req, res) => {
  try {
    const { mood, situation } = req.body;
    const user_id = req.user.id;
    
    // 간단한 추천 로직 (실제로는 더 복잡한 AI 모델을 사용)
    const recommendations = generateRecommendations(mood, situation);
    
    // 추천 결과를 데이터베이스에 저장
    const [result] = await pool.query(`
      INSERT INTO ai_recommendations (user_id, mood, situation, result_json, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `, [user_id, mood, situation, JSON.stringify(recommendations)]);
    
    res.json({
      success: true,
      message: 'AI 추천이 완료되었습니다.',
      data: {
        recommendations,
        recommendation_id: result.insertId
      }
    });
  } catch (error) {
    console.error('Error generating AI recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'AI 추천 생성에 실패했습니다.'
    });
  }
});

// 추천 결과 생성 함수
function generateRecommendations(mood, situation) {
  const recommendations = [];
  
  // 기분과 상황에 따른 간단한 추천 로직
  const moodTracks = {
    happy: [
      { title: "Happy", artist: "Pharrell Williams", reason: "행복한 기분에 어울리는 업비트 곡" },
      { title: "Good Life", artist: "OneRepublic", reason: "긍정적인 에너지를 주는 곡" }
    ],
    sad: [
      { title: "Fix You", artist: "Coldplay", reason: "슬픈 기분을 위로해주는 곡" },
      { title: "Someone Like You", artist: "Adele", reason: "감정을 표현하는 아름다운 곡" }
    ],
    angry: [
      { title: "In The End", artist: "Linkin Park", reason: "분노를 해소하는 록 곡" },
      { title: "Break Stuff", artist: "Limp Bizkit", reason: "에너지를 발산하는 곡" }
    ],
    excited: [
      { title: "Can't Stop The Feeling!", artist: "Justin Timberlake", reason: "신나는 기분을 더욱 고조시키는 곡" },
      { title: "Shake It Off", artist: "Taylor Swift", reason: "활기찬 분위기의 곡" }
    ],
    calm: [
      { title: "Clocks", artist: "Coldplay", reason: "차분한 분위기의 곡" },
      { title: "Yellow", artist: "Coldplay", reason: "평온한 기분에 어울리는 곡" }
    ],
    energetic: [
      { title: "Eye of the Tiger", artist: "Survivor", reason: "에너지 넘치는 동기부여 곡" },
      { title: "We Will Rock You", artist: "Queen", reason: "강렬한 비트의 곡" }
    ]
  };
  
  const situationTracks = {
    "운동할 때": [
      { title: "Stronger", artist: "Kanye West", reason: "운동할 때 듣기 좋은 힘찬 곡" },
      { title: "Titanium", artist: "David Guetta ft. Sia", reason: "에너지 넘치는 운동 곡" }
    ],
    "공부할 때": [
      { title: "River Flows In You", artist: "Yiruma", reason: "집중력을 높이는 피아노 곡" },
      { title: "Claire de Lune", artist: "Debussy", reason: "차분한 클래식 곡" }
    ],
    "드라이브할 때": [
      { title: "Highway to Hell", artist: "AC/DC", reason: "드라이브에 어울리는 록 곡" },
      { title: "Born to Run", artist: "Bruce Springsteen", reason: "자유로운 느낌의 곡" }
    ]
  };
  
  // 기분 기반 추천
  if (moodTracks[mood]) {
    recommendations.push(...moodTracks[mood]);
  }
  
  // 상황 기반 추천
  if (situationTracks[situation]) {
    recommendations.push(...situationTracks[situation]);
  }
  
  // 기본 추천 (추천이 부족한 경우)
  if (recommendations.length < 3) {
    recommendations.push(
      { title: "Bohemian Rhapsody", artist: "Queen", reason: "클래식한 명곡" },
      { title: "Imagine", artist: "John Lennon", reason: "평화로운 메시지의 곡" }
    );
  }
  
  return recommendations.slice(0, 4); // 최대 4개 추천
}

module.exports = router; 