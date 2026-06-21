<div align="center">

# 🎯 SmartHire AI

### AI-Powered Placement Preparation Platform

**Prepare. Perform. Get Placed.**

*Transform placement preparation from scattered guesswork to AI-driven, structured, personalized career readiness.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

[Demo](#) · [Documentation](#documentation) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Modules](#-modules)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview

**SmartHire AI** is a comprehensive, end-to-end placement preparation platform built specifically for college students. It addresses the fragmented ecosystem of placement preparation by combining AI-powered mock interviews, intelligent resume analysis, smart job tracking, and personalized career recommendations into a single, unified experience.

### 🎯 Problem We Solve

> **80% of students feel unprepared for placements** • **75% of resumes get rejected by ATS** • Students juggle 5-10+ disconnected platforms for prep • Coaching costs ₹10K-50K+ per student

### 💡 Our Solution

A unified AI ecosystem powered by Google Gemini, NLP, and modern web technologies that delivers:
- 🤖 **Realistic mock interviews** with adaptive difficulty
- 📊 **ATS-optimized resume scoring** with actionable insights
- 💼 **Smart application tracking** with analytics
- 🎯 **Personalized career roadmaps** based on skills & market trends

---

## ✨ Key Features

### 🤖 AI Mock Interview Module
- 5 domains × 3 difficulty levels = 75+ unique questions
- Real-time NLP-based answer evaluation (relevance, correctness, clarity, completeness)
- Adaptive difficulty engine that adjusts to your performance
- Voice-based interview mode with speech-to-text
- Company-specific patterns (Google, Amazon, Microsoft, TCS, Infosys)
- Detailed performance reports with strengths & weaknesses
- STAR method coaching for behavioral questions

### 📝 Intelligent Resume Analyzer
- ATS compatibility score (0-100) with section-wise breakdown
- Keyword matching against job descriptions
- Grammar, tone & formatting analysis
- AI-powered improvement suggestions (priority-ranked)
- Resume template builder with live preview
- One-click PDF generation
- Version history & comparison
- Skill gap analysis with learning recommendations

### 💼 Smart Job Application Tracker
- Kanban-style visual board (Applied → Interview → Offer)
- Multi-stage pipeline tracking (8 stages)
- Deadline reminders & calendar integration
- Application analytics (success rate, response time)
- Company-wise insights & ratings
- Document management (resume, cover letters, certificates)

### 🎯 Career Recommendation Engine
- AI-powered career path suggestions with match scores
- 6+ career paths analyzed (Full Stack, AI/ML, DevOps, etc.)
- Skill gap identification with priority rankings
- Personalized learning roadmaps (12-month plan)
- Market trend analysis (salary, growth, demand)
- Curated learning resources from top platforms

### 📊 Analytics & Insights
- 25+ types of analyses (resume, skills, interview, placement readiness)
- Predictive analytics for selection probability
- Peer benchmarking & cohort comparison
- Strength/weakness analysis with actionable insights
- Progress trends & weekly reports

### 🔔 Smart Notifications
- Multi-channel delivery (Email, SMS, Push, In-App)
- AI-prioritized alerts for deadlines & opportunities
- Filter by type (Reminders, Jobs, Achievements, AI Tips)
- Engagement tracking & preference management

### 👤 Comprehensive Profile Management
- Profile picture upload with preview
- Education, experience, skills, projects, certifications
- Certificate file upload (PDF/Image, up to 5MB)
- Career goals & vision setting
- Profile completion score with checklist
- Inline editing for all sections

### 👥 Multi-Role Support
- 🎓 **Students** — Core placement prep features
- 🏫 **Placement Officers (TPO)** — Batch analytics, drive management
- 🏢 **Recruiters** — Candidate search, ATS screening
- ⚙️ **Admins** — System management, audit logs

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Redux Toolkit** | State management |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client |
| **Socket.io Client** | Real-time communication |
| **Chart.js / Recharts** | Data visualization |
| **React Hot Toast** | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 20 LTS** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Primary database |
| **Mongoose** | ODM |
| **Redis** | Caching layer |
| **Socket.io** | WebSocket server |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **Multer** | File uploads |
| **Winston** | Logging |
| **Express Validator** | Request validation |

### AI / ML
| Technology | Purpose |
|------------|---------|
| **Google Gemini Pro API** | LLM for question gen & evaluation |
| **spaCy / Natural** | NLP processing |
| **LangChain.js** | AI orchestration |
| **Web Speech API** | Voice processing |

### DevOps & Tools
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **GitHub Actions** | CI/CD |
| **Vercel** | Frontend hosting |
| **Render / Railway** | Backend hosting |
| **AWS S3** | File storage |
| **Cloudinary** | Image management |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│       React SPA + PWA + Real-time WebSocket Client          │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS / WSS
┌─────────────────────────▼───────────────────────────────────┐
│                    API GATEWAY                               │
│   Express.js + JWT Auth + Rate Limiting + CORS + Helmet     │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┬─────────────────┐
        │                 │                 │                 │
┌───────▼──────┐ ┌────────▼─────────┐ ┌─────▼─────┐ ┌─────────▼────────┐
│ Auth Service │ │ Interview Service│ │ Resume API│ │ Tracker Service  │
└───────┬──────┘ └────────┬─────────┘ └─────┬─────┘ └─────────┬────────┘
        │                 │                 │                 │
        └─────────────────┴─────────────────┴─────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    AI/ML PIPELINE                            │
│  Gemini API • NLP Engine • Speech-to-Text • Scoring Models  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                      DATA LAYER                              │
│   MongoDB Atlas • Redis Cache • AWS S3 • Cloudinary CDN     │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
HireProAi/
├── backend/
│   ├── config/              # DB, Redis, Gemini, Cloudinary configs
│   ├── controllers/         # Route handlers (11 controllers)
│   ├── middleware/          # Auth, validation, rate limiting
│   ├── models/              # Mongoose schemas (8 models)
│   ├── routes/              # API routes (11 route files)
│   ├── services/            # Business logic (Gemini AI service)
│   ├── utils/               # Helpers, email service
│   ├── server.js            # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Dashboard, Interview, etc.)
│   │   ├── store/           # Redux store + slices
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── docker-compose.yml       # Multi-container setup
├── generate-pptx.js         # Hackathon presentation generator
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** ≥ 9.0.0
- **MongoDB Atlas** account (or local MongoDB) — *optional, uses in-memory DB for dev*
- **Google Gemini API Key** — *optional, for AI features*

### Installation

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/ShivaniKapase643/HireProAi.git
cd HireProAi
```

#### 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

#### 3️⃣ Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### 4️⃣ Configure Environment Variables
```bash
cd ../backend
cp .env.example .env
# Edit .env with your credentials (see Environment Variables section)
```

#### 5️⃣ Run the Application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Server runs at `http://localhost:5000`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:5173`

#### 🐳 Or Use Docker
```bash
docker-compose up --build
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthire-ai
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI / ML
GEMINI_API_KEY=your-gemini-api-key

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=smarthire-ai-bucket
AWS_REGION=ap-south-1

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file to version control!**

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/forgot-password` | Request password reset |
| PUT | `/auth/reset-password/:token` | Reset password |
| POST | `/auth/verify-otp` | Verify OTP |
| POST | `/auth/google` | Google OAuth login |

### 👤 User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update profile |
| PUT | `/users/profile/picture` | Upload profile picture |
| PUT | `/users/change-password` | Change password |

### 🤖 Interview Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/interviews/start` | Start mock interview |
| POST | `/interviews/:id/message` | Send answer |
| PUT | `/interviews/:id/end` | End interview |
| GET | `/interviews/history` | Get interview history |
| GET | `/interviews/:id/report` | Generate report |

### 📄 Resume Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resumes/upload` | Upload resume |
| POST | `/resumes/:id/analyze` | Analyze resume |
| GET | `/resumes/:id/ats-score` | Get ATS score |
| POST | `/resumes/:id/match-jd` | Match job description |
| POST | `/resumes/generate` | Generate AI resume |

### 💼 Job & Application Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/applications` | Get all applications |
| POST | `/applications` | Create application |
| PUT | `/applications/:id/stage` | Update stage |
| GET | `/applications/kanban` | Get Kanban board |
| GET | `/applications/analytics` | Get analytics |

> 📚 Full API documentation available at `/api/docs` when running locally.

---

## 🧩 Modules

| # | Module | Description | Requirements |
|---|--------|-------------|--------------|
| 1 | **User Management** | Registration, Auth, Profile, Roles | FR-1 |
| 2 | **AI Mock Interview** | Adaptive NLP interviews | FR-2 |
| 3 | **Resume Analyzer** | ATS scoring & optimization | FR-3 |
| 4 | **Smart Job Tracker** | Kanban + Calendar sync | FR-4 |
| 5 | **Career Recommendation** | AI career paths | FR-5 |
| 6 | **Analytics & Insights** | 25+ analysis types | FR-6 |
| 7 | **Notifications** | Multi-channel alerts | FR-7 |
| 8 | **Voice Intelligence** | STT, fluency analysis | FR-8 |
| 9 | **TPO Module** | Placement officer tools | FR-9 |
| 10 | **Admin Module** | System management | FR-10 |
| 11 | **Recruiter Module** | Hiring pipeline | FR-11 |
| 12 | **Integration Module** | Gemini, LinkedIn, GitHub | FR-12 |

---

## 📸 Screenshots

> 📷 Screenshots & demo video coming soon!

| Module | Status |
|--------|--------|
| 🏠 Dashboard | ✅ Live |
| 🤖 Mock Interview | ✅ Live |
| 📄 Resume Analyzer | ✅ Live |
| 🎯 Career Roadmap | ✅ Live |
| 💼 Job Tracker | ✅ Live |
| 📊 Analytics | ✅ Live |

---

## 🗺 Roadmap

### Phase 1 (0-3 Months) — Foundation ✅
- [x] Authentication & user management
- [x] AI mock interview engine
- [x] Resume analyzer with ATS scoring
- [x] Job application tracker
- [x] Career recommendations

### Phase 2 (3-6 Months) — Beta Launch
- [ ] Voice interview mode (full implementation)
- [ ] Mobile app (React Native)
- [ ] LinkedIn integration
- [ ] Real-time notifications via Socket.io
- [ ] Admin & TPO dashboards (full)

### Phase 3 (6-12 Months) — Scale
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Video interview with body language analysis
- [ ] B2B API for HR tech platforms
- [ ] College partnership portal
- [ ] Advanced analytics with ML predictions

### Phase 4 (1-3 Years) — National Scale
- [ ] 1M+ student users
- [ ] Pan-India coverage
- [ ] Marketplace launch
- [ ] AI-powered job matching algorithm 2.0

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Add comments for complex logic
- Write meaningful commit messages
- Update tests where applicable

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 2 seconds |
| API Response | < 200ms (p95) |
| AI Processing | < 10 seconds |
| Concurrent Users | 100,000+ |
| Uptime SLA | 99.9% |
| Lighthouse Score | 90+ |

---

## 🔒 Security

- ✅ JWT-based authentication with refresh tokens
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ HTTPS-only API communication
- ✅ Rate limiting on all endpoints
- ✅ Input validation & sanitization
- ✅ SQL/NoSQL injection prevention
- ✅ CORS configured for trusted origins
- ✅ Helmet.js security headers
- ✅ Session timeout after 30 min inactivity

Found a security issue? Please email **security@smarthireai.com** instead of opening a public issue.

---

## 👥 Team

<table>
<tr>
<td align="center" width="50%">
<b>Yashvant</b><br/>
<sub><b>Full Stack & AI Engineer</b></sub><br/>
<sub>Backend • AI/ML • DevOps</sub>
</td>
<td align="center" width="50%">
<b>Shivani Kapase</b><br/>
<sub><b>Frontend & UX Designer</b></sub><br/>
<sub>React • UI/UX • Analytics</sub>
</td>
</tr>
</table>

> *"Twin minds, one mission — making placement prep smarter for every student."*

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

```
MIT License - Copyright (c) 2026 Team TwinTech
```

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) — for powering our AI features
- [MongoDB Atlas](https://www.mongodb.com/atlas) — for cloud database
- [Tailwind CSS](https://tailwindcss.com/) — for styling system
- [Vercel](https://vercel.com/) — for hosting
- All open-source contributors who made this project possible

---

## 📞 Contact & Support

- 🌐 **Website:** [smarthireai.com](#) *(coming soon)*
- 📧 **Email:** team@smarthireai.com
- 💬 **Discord:** [Join our community](#)
- 🐦 **Twitter:** [@SmartHireAI](#)
- 📺 **Demo:** [Watch on YouTube](#)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ by Team TwinTech**

*Empowering Every Student to Land Their Dream Job*

</div>
