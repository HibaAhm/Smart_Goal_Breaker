# Goal Breaker Backend

FastAPI backend for the Goal Breaker application.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with:
```
DATABASE_URL=postgresql://username:password@localhost:5432/goal_breaker
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Get your Gemini API key from: https://makersuite.google.com/app/apikey

4. Run the server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

