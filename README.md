# 🔥 ForgeSDR: Autonomous AI Sales Development Agent

<div align="center">

![ForgeSDR Banner](https://img.shields.io/badge/ForgeSDR-AI%20Sales%20Agent-blue?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3--70B-orange?style=flat-square)](https://groq.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

**Transform cold outreach into personalized conversations with AI-powered research and analysis.**

[Live Demo](#-live-links) • [Features](#-core-features) • [Installation](#-installation) • [API Docs](#-api-documentation)

</div>

---

## 📖 Overview

ForgeSDR is a **high-performance, full-stack AI agent** that automates deep company research and generates hyper-personalized sales outreach. By leveraging parallel web scraping and advanced LLM analysis, the system transforms raw company URLs into tailored value propositions and email drafts in seconds.

### 🎯 What It Does

1. **🔍 Deep Research**: Crawls target company websites, blogs, and case studies to extract pain points and priorities
2. **🧠 AI Analysis**: Uses Llama 3.3-70B to analyze company context and generate insights
3. **✍️ Smart Outreach**: Crafts personalized value propositions and email drafts based on research
4. **📊 Track Everything**: Stores all leads, pitches, and metadata in a cloud database
5. **⚡ Lightning Fast**: Processes multiple companies in parallel with async architecture

---

## 🚀 Live Links

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [forgesdr.vercel.app](https://forgesdr.vercel.app) | 🟢 Live |
| **Backend API** | [your-app.railway.app](https://your-app.railway.app) | 🟢 Live |
| **API Docs** | [your-app.railway.app/docs](https://your-app.railway.app/docs) | 📚 Interactive |

---

## ✨ Core Features

### 🚄 Parallel Bulk Processing
- Process **multiple target URLs simultaneously** using Python's `asyncio`
- Non-blocking architecture for maximum throughput
- Average processing time: **3-5 seconds per company**

### 🔎 Deep Context Research
- Automatically discovers and scrapes internal links (blogs, case studies, about pages)
- Extracts **specific pain points** and business challenges
- Markdown-optimized content extraction with `crawl4ai`

### 🎯 Value Proposition Refiner
- Analyzes your input pitch against scraped company data
- Suggests **optimized value propositions** tailored to each prospect
- Context-aware recommendations based on industry and challenges

### 💾 Persistent History
- Integrated with **Supabase PostgreSQL** for cloud storage
- Track all leads, pitches, and performance metrics
- Full audit trail with token usage and processing times

### 📧 Universal Email Integration
- Uses standard `mailto:` protocol
- Works with **any default email client** (Gmail, Outlook, Apple Mail)
- Pre-populated subject lines and personalized body text

---

## 🏗️ Technical Stack

### Frontend
```
Framework:    Next.js 14 (App Router)
Styling:      Tailwind CSS
State:        React Hooks
Deployment:   Vercel
```

### Backend
```
Framework:    FastAPI (Python 3.12+)
Scraping:     crawl4ai (async-first web crawler)
Concurrency:  asyncio for parallel execution
LLM:          Llama 3.3-70B via Groq (~200+ tokens/sec)
Database:     Supabase PostgreSQL
Deployment:   Railway
```

### Infrastructure
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **LLM Inference** | Groq Cloud | Ultra-fast Llama 3.3-70B inference |
| **Database** | Supabase | PostgreSQL with real-time subscriptions |
| **Frontend Host** | Vercel | Edge network with automatic deployments |
| **Backend Host** | Railway | Containerized Python environment |

---

## 🛠️ Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.12+
- **Supabase** account ([free tier available](https://supabase.com))
- **Groq API** key ([get one here](https://console.groq.com))

### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your credentials:
# GROQ_API_KEY=your_groq_api_key
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_anon_key

# 5. Run the server
uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
# 1. Navigate to project root
cd ..

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# 4. Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 📊 Database Schema

The system uses a `leads` table in PostgreSQL:

```sql
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_url TEXT NOT NULL,
    pitch TEXT,
    refined_prop TEXT,
    token_usage INTEGER,
    processing_time FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `company_url` | TEXT | Target company website URL |
| `pitch` | TEXT | Original value proposition input |
| `refined_prop` | TEXT | AI-generated refined pitch |
| `token_usage` | INTEGER | LLM tokens consumed |
| `processing_time` | FLOAT | Total processing time (seconds) |
| `created_at` | TIMESTAMP | Record creation timestamp |

---

## 🔌 API Documentation

### Endpoints

#### `POST /research`
Analyze a company URL and generate personalized outreach.

**Request:**
```json
{
  "company_url": "https://example.com",
  "pitch": "We help SaaS companies reduce churn by 30%"
}
```

**Response:**
```json
{
  "company_name": "Example Corp",
  "pain_points": ["High customer churn", "Complex onboarding"],
  "refined_pitch": "Based on your recent blog post about retention...",
  "email_draft": "Subject: Reducing churn at Example Corp\n\nHi [Name]...",
  "token_usage": 1250,
  "processing_time": 4.2
}
```

#### `GET /leads`
Retrieve all processed leads from the database.

**Response:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "company_url": "https://example.com",
    "pitch": "...",
    "refined_prop": "...",
    "created_at": "2024-03-29T10:30:00Z"
  }
]
```

Interactive API documentation available at `/docs` when running locally.

---

## 🚀 Deployment

### Deploy Backend to Railway

```bash
cd backend
railway login
railway init
railway up

# Set environment variables
railway variables set GROQ_API_KEY=your_key
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_KEY=your_key
```

### Deploy Frontend to Vercel

```bash
cd ..
vercel login
vercel --prod

# Add environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## 🎨 Architecture

```
┌─────────────────┐
│   Next.js UI    │
│  (Vercel Edge)  │
└────────┬────────┘
         │
         ├─────────────┐
         │             │
         ▼             ▼
┌─────────────┐  ┌──────────────┐
│  FastAPI    │  │  Supabase    │
│  Backend    │  │  PostgreSQL  │
│  (Railway)  │  │              │
└──────┬──────┘  └──────────────┘
       │
       ├──────────┬──────────┐
       │          │          │
       ▼          ▼          ▼
  ┌────────┐  ┌────────┐  ┌────────┐
  │ Crawl  │  │  Groq  │  │ Email  │
  │  4AI   │  │  LLM   │  │ Client │
  └────────┘  └────────┘  └────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Groq** for blazing-fast LLM inference
- **Supabase** for seamless PostgreSQL hosting
- **crawl4ai** for markdown-optimized web scraping
- **Vercel** and **Railway** for excellent deployment platforms

---

<div align="center">

**Built with ❤️ by Ansh**

[Report Bug](https://github.com/anshdev0/ForgeSDR/issues) • [Request Feature](https://github.com/anshdev0/ForgeSDR/issues)

</div>
