# 🎵 DIGIDING - 일렉트로닉 음악 커뮤니티

음악을 사랑하는 모두를 위한 일렉트로닉 커뮤니티 플랫폼입니다. 아티스트 정보, 커뮤니티, AI 음악 추천까지 한 곳에서!

## ✨ 주요 기능

- 🎨 **아티스트 정보** - 다양한 아티스트의 프로필과 음악 탐색
- 💬 **커뮤니티** - 장르별, 아티스트별 소통 공간
- 🤖 **AI 음악 추천** - 기분과 상황에 맞는 음악 추천
- 👤 **사용자 인증** - 로그인/회원가입 시스템
- 📱 **반응형 디자인** - 모바일 친화적 UI

## 🛠️ 기술 스택

### Frontend
- **React 19.1.0** + **TypeScript**
- **Vite 5.4.19** (개발 서버)
- **Tailwind CSS** (스타일링)
- **React Router DOM 7.6.3** (라우팅)
- **Axios 1.10.0** (API 통신)

### Backend
- **Node.js 20.11.1**
- **Express 5.1.0** (웹 프레임워크)
- **MySQL2 3.14.1** (데이터베이스)
- **JWT** (인증)
- **bcryptjs** (비밀번호 해싱)

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone [your-repository-url]
cd summer-dev-project
```

### 2. 프론트엔드 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
- **접속 URL**: `http://localhost:5173` (또는 5174)

### 3. 백엔드 설정
```bash
# 서버 디렉토리로 이동
cd server

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
- **서버 URL**: `http://localhost:5000`
- **API URL**: `http://localhost:5000/api`

### 4. 데이터베이스 설정
```bash
# MySQL 설치 및 실행
# .env 파일 설정 (server/.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=diggiding

# 데이터베이스 초기화
cd server
node scripts/initDB.js
```

## 📁 프로젝트 구조

```
summer-dev-project/
├── src/                    # 프론트엔드 소스
│   ├── components/         # 공통 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── services/          # API 서비스
│   ├── types/             # TypeScript 타입
│   └── ...
├── server/                # 백엔드 소스
│   ├── config/            # 설정 파일
│   ├── controllers/       # 컨트롤러
│   ├── middleware/        # 미들웨어
│   ├── models/            # 데이터 모델
│   ├── routes/            # API 라우트
│   └── ...
├── package.json           # 프론트엔드 의존성
└── server/package.json    # 백엔드 의존성
```

## 🔌 API 엔드포인트

### 인증
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입

### 사용자
- `GET /api/users/*` - 사용자 정보

### 아티스트
- `GET /api/artists` - 아티스트 목록
- `GET /api/artists/:id` - 아티스트 상세

### 커뮤니티
- `GET /api/communities` - 커뮤니티 목록
- `GET /api/communities/:id` - 커뮤니티 상세
- `GET /api/communities/:id/posts` - 커뮤니티 게시글

### 게시글
- `POST /api/posts` - 게시글 작성
- `GET /api/posts/:id` - 게시글 상세
- `GET /api/posts/:id/comments` - 댓글 목록
- `POST /api/posts/:id/comments` - 댓글 작성

### AI 추천
- `POST /api/ai/recommend` - AI 음악 추천

## 🎨 UI/UX 특징

- **다크 테마** - 눈에 편안한 다크 모드
- **반응형 디자인** - 모든 디바이스에서 최적화
- **모던 UI** - 깔끔하고 직관적인 인터페이스
- **애니메이션** - 부드러운 전환 효과

## 🔧 개발 스크립트

### 프론트엔드
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # 코드 린팅
```

### 백엔드
```bash
npm run dev      # 개발 서버 실행 (nodemon)
npm start        # 프로덕션 서버 실행
```

## 📝 환경 변수

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=diggiding
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👥 팀

- **개발자**: [Your Name]
- **프로젝트**: DIGIDING - 일렉트로닉 음악 커뮤니티

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
