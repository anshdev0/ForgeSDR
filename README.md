⚒️ ForgeSDR: Autonomous AI Sales Agent
ForgeSDR is a high-performance, full-stack AI agent designed to automate deep company research and generate hyper-personalized sales outreach. By leveraging parallel web scraping and LLM-based analysis, it transforms raw URLs into tailored value propositions in seconds.

🚀 Live Demo
Frontend: [Insert your Vercel Link Here]

Backend API: [Insert your Railway Link Here]

✨ Key Features
Parallel Bulk Processing: Processes multiple target URLs simultaneously using asyncio and crawl4ai for maximum efficiency.

Deep Research Mode: Automatically discovers and scrapes internal links (blogs, case studies) to identify specific company pain points.

Value Prop Refiner: Analyzes the user's raw pitch against real-time research to suggest an optimized "Power Version".

Persistent Lead Tracking: All generated pitches and metadata are stored in a cloud PostgreSQL database for permanent access.

Universal Mailer: Integrated mailto: protocol to launch the user's preferred desktop or web-based email client instantly.

🏗️ Tech Stack
Frontend
Framework: Next.js 14 (App Router).

Styling: Tailwind CSS for a modern, "Monk Mode" inspired aesthetic.

State Management: React Hooks with persistent storage synchronization.

Deployment: Vercel.

Backend
Framework: FastAPI (Python).

Scraping: crawl4ai for high-speed, LLM-friendly markdown extraction.

Orchestration: asyncio for parallelized research tasks.

Deployment: Railway.

AI & Database
LLM: Llama 3.3-70B via Groq for sub-second inference.

Database: Supabase (PostgreSQL) for lead history and metadata.

🛠️ Installation & Setup
1. Backend Setup
Bash

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
Create a .env file in the /backend folder:

Plaintext

GROQ_API_KEY=your_key
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_key
2. Frontend Setup
Bash

cd frontend
npm install
npm run dev
📊 Database Schema
The project uses the following PostgreSQL structure in Supabase:

id: UUID (Primary Key)

company_url: TEXT (Target domain)

pitch: TEXT (Generated outreach)

refined_prop: TEXT (Optimized value proposition)

token_usage: INTEGER (LLM cost tracking)

processing_time: FLOAT (Performance metrics)

📖 License
MIT License. Built by Ansh as part of a transition into AI Engineering.
