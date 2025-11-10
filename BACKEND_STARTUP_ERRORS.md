# Backend Startup Errors - Solutions

## Common Errors & Fixes

### Error 1: "ModuleNotFoundError: No module named 'fastapi'"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

If that doesn't work, try:
```bash
pip3 install -r requirements.txt
```

Or if using Python directly:
```bash
python -m pip install -r requirements.txt
```

---

### Error 2: "DATABASE_URL environment variable is not set"

**Problem:** Missing `.env` file or wrong location

**Solution:**
1. Make sure `backend/.env` file exists
2. Check it's in the `backend` folder (not root folder)
3. Verify it contains: `DATABASE_URL=postgresql://...`

**Check:**
```bash
cd backend
dir .env    # Windows
# or
ls .env     # Mac/Linux
```

---

### Error 3: "GEMINI_API_KEY environment variable is not set"

**Problem:** Missing API key in `.env` file

**Solution:**
1. Open `backend/.env`
2. Add line: `GEMINI_API_KEY=your_key_here`
3. Get key from: https://makersuite.google.com/app/apikey

---

### Error 4: "Could not connect to database"

**Problem:** PostgreSQL connection issue

**Solutions:**
- Make sure PostgreSQL is running
- Check your `DATABASE_URL` in `.env` is correct
- Verify username, password, host, port are correct
- Make sure database exists (or create it)

**Test connection:**
```bash
# Try connecting manually (if you have psql installed)
psql -h localhost -U your_username -d your_database
```

---

### Error 5: "No module named 'app'"

**Problem:** Running from wrong directory

**Solution:**
Make sure you're in the `backend` folder:
```bash
cd backend
uvicorn app.main:app --reload
```

**NOT:**
```bash
cd goal_braker
uvicorn app.main:app --reload  # ❌ Wrong!
```

---

### Error 6: "uvicorn: command not found"

**Problem:** Uvicorn not installed

**Solution:**
```bash
pip install uvicorn[standard]
```

Or install all requirements:
```bash
pip install -r requirements.txt
```

---

### Error 7: Port 8000 already in use

**Problem:** Another app is using port 8000

**Solutions:**

**Option 1:** Stop the other app using port 8000

**Option 2:** Use a different port:
```bash
uvicorn app.main:app --reload --port 8001
```

Then update `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8001
```

---

## Step-by-Step Startup Checklist

### Step 1: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Create .env File
Create `backend/.env` with:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/goal_breaker
GEMINI_API_KEY=your_gemini_api_key
```

### Step 3: Verify PostgreSQL is Running
- Check if PostgreSQL service is running
- Test connection if possible

### Step 4: Run Backend
```bash
cd backend
uvicorn app.main:app --reload
```

---

## What Success Looks Like

When backend starts successfully, you'll see:

```
INFO:     Will watch for changes in these directories: ['C:\\Users\\...\\backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## Still Getting Errors?

**Share the exact error message** and I can help you fix it!

Common things to check:
1. Full error message (copy/paste it)
2. Are you in the `backend` folder?
3. Did you install dependencies?
4. Does `backend/.env` exist?
5. Is PostgreSQL running?

