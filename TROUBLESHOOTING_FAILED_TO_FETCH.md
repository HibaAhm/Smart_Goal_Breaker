# Troubleshooting "Failed to Fetch" Error

## Common Causes & Solutions

### 1. ✅ Backend Not Running

**Check:** Is your backend server running?

**Solution:**
```bash
cd backend
uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

**Keep this terminal open!** The backend must be running.

---

### 2. ✅ Wrong Port or URL

**Check:** Is backend running on port 8000?

**Solution:**
- Make sure backend is on `http://localhost:8000`
- Check `frontend/.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000`
- Restart frontend after changing `.env.local`

---

### 3. ✅ Database Connection Error

**Check:** Can backend connect to PostgreSQL?

**Symptoms:**
- Backend starts but crashes when you submit a goal
- Error in backend terminal about database

**Solution:**
- Check `backend/.env` has correct `DATABASE_URL`
- Make sure PostgreSQL is running
- Verify database exists

---

### 4. ✅ Missing Environment Variables

**Check:** Are all environment variables set?

**Solution:**
- Verify `backend/.env` exists with:
  - `DATABASE_URL=postgresql://...`
  - `GEMINI_API_KEY=...`
- Restart backend after creating/editing `.env`

---

### 5. ✅ CORS Issues

**Check:** Is CORS configured correctly?

**Solution:**
- CORS is already configured in `main.py`
- Make sure frontend is on `http://localhost:3000`
- Make sure backend allows `http://localhost:3000`

---

## Step-by-Step Debugging

### Step 1: Check Backend is Running

Open browser and go to: **http://localhost:8000**

You should see:
```json
{"message": "Goal Breaker API is running"}
```

If you see this, backend is running ✅

If you get "can't connect", backend is NOT running ❌

---

### Step 2: Check API Endpoint

Open browser and go to: **http://localhost:8000/docs**

You should see FastAPI's automatic documentation page.

If you see it, backend is working ✅

---

### Step 3: Check Frontend Environment

Verify `frontend/.env.local` exists and has:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Important:** Restart frontend after creating/editing this file!

---

### Step 4: Check Browser Console

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Try submitting a goal
4. Look for error messages

Common errors:
- `Failed to fetch` → Backend not running or wrong URL
- `CORS error` → CORS configuration issue
- `Network error` → Backend not accessible

---

### Step 5: Check Backend Terminal

Look at the backend terminal for errors:

**Good signs:**
```
INFO:     127.0.0.1:xxxxx - "POST /api/goals HTTP/1.1" 200 OK
```

**Bad signs:**
```
ERROR: Database connection failed
ERROR: GEMINI_API_KEY not set
ERROR: ...
```

---

## Quick Fix Checklist

- [ ] Backend is running (`uvicorn app.main:app --reload`)
- [ ] Backend accessible at http://localhost:8000
- [ ] `backend/.env` file exists with correct values
- [ ] `frontend/.env.local` file exists with `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Frontend restarted after creating `.env.local`
- [ ] PostgreSQL is running
- [ ] No errors in backend terminal
- [ ] No errors in browser console

---

## Test Backend Manually

You can test if backend works by running this in a new terminal:

**Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "http://localhost:8000" -Method GET
```

**Mac/Linux:**
```bash
curl http://localhost:8000
```

**Or use browser:**
Just go to http://localhost:8000

If you see `{"message": "Goal Breaker API is running"}`, backend is working!

---

## Still Not Working?

1. **Check backend terminal** - Look for error messages
2. **Check browser console** (F12) - Look for detailed errors
3. **Verify both servers are running:**
   - Backend: http://localhost:8000
   - Frontend: http://localhost:3000
4. **Try restarting both servers**

