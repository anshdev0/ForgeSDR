ForgeSDR: Autonomous AI Sales Development Agent
ForgeSDR is a high-performance, full-stack AI agent designed to automate deep company research and generate hyper-personalized sales outreach. By leveraging parallel web scraping and LLM-based analysis, the system transforms raw URLs into tailored value propositions and email drafts.

🚀 Live Links
Frontend: [Insert Vercel URL]

Backend API: [Insert Railway URL]

✨ Core Features
Parallel Bulk Processing: Processes multiple target URLs simultaneously using asyncio and crawl4ai.

Deep Context Research: Automatically discovers and scrapes internal links (blogs, case studies) to identify specific pain points.

Value Prop Refiner: Analyzes raw input against research data to suggest optimized value propositions.

Persistent History: Integrated with Supabase (PostgreSQL) for cloud-based lead tracking and metadata storage.

Universal Email Integration: Uses standard mailto: protocols to interface with any default system email client.

🏗️ Technical Stack
Frontend
Framework: Next.js 14 (App Router)

Styling: Tailwind CSS

Database Interface: Client-side fetching from FastAPI/Supabase

Backend
Framework: FastAPI (Python)

Scraping: crawl4ai for markdown-optimized extraction

Concurrency: asyncio for non-blocking parallel execution

Infrastructure
LLM: Llama 3.3-70B via Groq (Inference speed: ~200+ tokens/sec)

Database: Supabase PostgreSQL

Hosting: Vercel (Frontend) and Railway (Backend)

🛠️ Installation
Backend
Navigate to /backend

Install dependencies: pip install -r requirements.txt

Configure .env with GROQ_API_KEY, SUPABASE_URL, and SUPABASE_KEY

Run: uvicorn main:app --reload

Frontend
Navigate to the root directory

Install dependencies: npm install

Run: npm run dev

📊 Database Schema
The system utilizes a leads table in PostgreSQL with the following fields:

id: UUID (Primary Key)

company_url: TEXT

pitch: TEXT

refined_prop: TEXT

token_usage: INTEGER

processing_time: FLOAT
