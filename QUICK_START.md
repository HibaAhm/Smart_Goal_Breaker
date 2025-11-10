# 🚀 Quick Start Guide

## What You Need

1. **PostgreSQL Database** - Connection string (username, password, host, port, database name)
2. **Gemini API Key** - Free at https://makersuite.google.com/app/apikey

## Setup Steps

### 1. Backend Setup (5 minutes)

```bash
cd backend
pip install -r requirements.txt
```

Create `backend/.env`:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=your_gemini_api_key_here
```

Run backend:
```bash
uvicorn app.main:app --reload
```

✅ Backend running on http://localhost:8000

### 2. Frontend Setup (3 minutes)

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run frontend:
```bash
npm run dev
```

✅ Frontend running on http://localhost:3000

## That's It! 🎉

Open http://localhost:3000 and start breaking down goals!

## Need Help?

Just provide:
- PostgreSQL connection details (username, password, host, port, database)
- Your Gemini API key

And I'll help you configure everything!

