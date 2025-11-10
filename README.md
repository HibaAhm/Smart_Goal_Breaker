# The Smart Goal Breaker 🎯

Break down your vague goals into actionable steps using AI.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 14 (TypeScript)
- **UI**: shadcn/ui components
- **Database**: PostgreSQL
- **AI**: Google Gemini

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL database
- Gemini API key (get it free at https://makersuite.google.com/app/apikey)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/goal_breaker
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the server:
```bash
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Database Setup

You'll need to provide your PostgreSQL connection details. The app will automatically create the necessary tables on first run.

## Features

- ✅ Enter a vague goal
- ✅ AI breaks it down into 5 actionable steps
- ✅ Complexity score (1-10)
- ✅ Save to PostgreSQL
- ✅ View all goals and their breakdowns

## API Endpoints

- `POST /api/goals` - Create a new goal
- `GET /api/goals` - Get all goals
- `GET /api/goals/{id}` - Get a specific goal

