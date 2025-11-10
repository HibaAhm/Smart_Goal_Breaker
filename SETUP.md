# Setup Instructions

## Step 1: Database Setup

You need to provide your PostgreSQL connection details. The format is:
```
postgresql://username:password@host:port/database_name
```

Example:
```
postgresql://postgres:mypassword@localhost:5432/goal_breaker
```

## Step 2: Backend Configuration

1. Go to `backend/` directory
2. Create a `.env` file with:
```
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Get your Gemini API key from: https://makersuite.google.com/app/apikey (it's free!)

4. Install Python dependencies:
```bash
pip install -r requirements.txt
```

5. Initialize the database (optional, tables are created automatically):
```bash
python app/init_db.py
```

6. Run the backend:
```bash
uvicorn app.main:app --reload
```

## Step 3: Frontend Configuration

1. Go to `frontend/` directory
2. Create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Install dependencies:
```bash
npm install
```

4. Run the frontend:
```bash
npm run dev
```

## Step 4: Access the App

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Need Help?

Just provide your PostgreSQL connection details and Gemini API key, and I'll help you configure everything!

