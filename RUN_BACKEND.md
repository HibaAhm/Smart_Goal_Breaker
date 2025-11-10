# How to Run the Backend

## Method 1: Using uvicorn command (Standard)

After installing dependencies, run:

```bash
cd backend
uvicorn app.main:app --reload
```

**What you should see:**
```
INFO:     Will watch for changes in these directories: ['C:\\Users\\...\\backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## Method 2: Using Python module (If uvicorn command not found)

If `uvicorn` command doesn't work, use:

```bash
cd backend
python -m uvicorn app.main:app --reload
```

Or:

```bash
cd backend
python3 -m uvicorn app.main:app --reload
```

---

## Method 3: Using the batch file (Windows)

Double-click `run_backend.bat` in the root folder, or run:

```bash
.\run_backend.bat
```

---

## Step-by-Step (First Time Setup)

### Step 1: Make sure you're in the backend folder
```bash
cd backend
```

### Step 2: Install dependencies (if not done yet)
```bash
pip install -r requirements.txt
```

### Step 3: Make sure .env file exists
Check that `backend/.env` has:
- `DATABASE_URL=postgresql://...`
- `GEMINI_API_KEY=...`

### Step 4: Run the server
```bash
uvicorn app.main:app --reload
```

---

## What "reload" means

The `--reload` flag means:
- ✅ Automatically restarts when you change code
- ✅ Great for development
- ❌ Remove it for production

---

## Verify it's working

1. **Check terminal** - Should show "Uvicorn running on http://127.0.0.1:8000"

2. **Open browser** - Go to: http://localhost:8000
   - Should see: `{"message": "Goal Breaker API is running"}`

3. **Check API docs** - Go to: http://localhost:8000/docs
   - Should see FastAPI's automatic documentation

---

## Troubleshooting

### "uvicorn: command not found"
**Solution:** Use `python -m uvicorn app.main:app --reload`

### "DATABASE_URL not set"
**Solution:** Create `backend/.env` file with your database connection

### "Port 8000 already in use"
**Solution:** 
- Stop the other app using port 8000, OR
- Use different port: `uvicorn app.main:app --reload --port 8001`
- Then update `frontend/.env.local` to match

### "Module not found"
**Solution:** Run `pip install -r requirements.txt` first

---

## Keep it running!

**Important:** Keep the terminal window open while the backend is running. Closing it will stop the server.

To stop the server, press `CTRL+C` in the terminal.

---

## Quick Reference

```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
pip install -r requirements.txt

# Run backend
uvicorn app.main:app --reload

# Or if uvicorn not found:
python -m uvicorn app.main:app --reload
```

