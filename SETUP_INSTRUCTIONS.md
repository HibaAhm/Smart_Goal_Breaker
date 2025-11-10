# 📝 Setup Instructions - Fill in Your Details

## Step 1: Create Backend Environment File

1. Go to the `backend` folder
2. Create a new file named `.env` (copy from `.env.example` if needed)
3. Fill in these values:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

### PostgreSQL Connection String Format:
```
postgresql://username:password@host:port/database_name
```

**Example:**
```
postgresql://postgres:mypassword123@localhost:5432/goal_breaker
```

**What you need:**
- `username` - Your PostgreSQL username (often "postgres")
- `password` - Your PostgreSQL password
- `host` - Usually "localhost" or "127.0.0.1"
- `port` - Usually "5432" (default PostgreSQL port)
- `database_name` - Name of your database (e.g., "goal_breaker")

### Gemini API Key:
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in `.env`

---

## Step 2: Create Frontend Environment File

1. Go to the `frontend` folder
2. Create a new file named `.env.local`
3. Add this line (usually doesn't need to change):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Step 3: Install Dependencies

### Backend:
```bash
cd backend
pip install -r requirements.txt
```

### Frontend:
```bash
cd frontend
npm install
```

---

## Step 4: Run the Application

### Terminal 1 - Backend:
```bash
cd backend
uvicorn app.main:app --reload
```

You should see: `Uvicorn running on http://127.0.0.1:8000`

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

You should see: `Ready on http://localhost:3000`

---

## Step 5: Open the App

Open your browser and go to: **http://localhost:3000**

---

## Troubleshooting

### Database Connection Error?
- Make sure PostgreSQL is running
- Check your username, password, host, and port are correct
- Verify the database exists (or create it: `CREATE DATABASE goal_breaker;`)

### Gemini API Error?
- Make sure your API key is correct
- Check you have internet connection
- Verify the API key is active at https://makersuite.google.com/app/apikey

### Frontend Can't Connect to Backend?
- Make sure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Make sure CORS is enabled (it is by default)

---

## Quick Checklist

- [ ] Created `backend/.env` with PostgreSQL and Gemini API key
- [ ] Created `frontend/.env.local` with API URL
- [ ] Installed backend dependencies (`pip install -r requirements.txt`)
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Backend is running (`uvicorn app.main:app --reload`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Opened http://localhost:3000 in browser

