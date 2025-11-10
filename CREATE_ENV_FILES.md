# Create Environment Files

Since `.env` files are gitignored, you need to create them manually.

## Backend `.env` File

**Location:** `backend/.env`

**Content:**
```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

**Replace:**
- `YOUR_USERNAME` → Your PostgreSQL username
- `YOUR_PASSWORD` → Your PostgreSQL password  
- `YOUR_HOST` → Usually `localhost` or `127.0.0.1`
- `YOUR_PORT` → Usually `5432`
- `YOUR_DATABASE` → Database name (e.g., `goal_breaker`)
- `YOUR_GEMINI_API_KEY_HERE` → Your Gemini API key from https://makersuite.google.com/app/apikey

**Example:**
```env
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/goal_breaker
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Frontend `.env.local` File

**Location:** `frontend/.env.local`

**Content:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

(Usually doesn't need to change unless your backend runs on a different port)

---

## Quick Copy-Paste Commands

### Windows (PowerShell):
```powershell
# Backend
cd backend
Copy-Item .env.example .env
# Then edit .env with your details

# Frontend  
cd ..\frontend
Copy-Item .env.local.example .env.local
```

### Mac/Linux:
```bash
# Backend
cd backend
cp .env.example .env
# Then edit .env with your details

# Frontend
cd ../frontend
cp .env.local.example .env.local
```

