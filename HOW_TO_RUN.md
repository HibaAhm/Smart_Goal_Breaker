# 🚀 How to Run the App

## Prerequisites Checklist

Before running, make sure you have:

- [ ] Created `backend/.env` with your PostgreSQL and Gemini API credentials
- [ ] Created `frontend/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] PostgreSQL is installed and running
- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed

---

## Step 1: Install Backend Dependencies

Open a terminal/command prompt and run:

```bash
cd backend
pip install -r requirements.txt
```

**Note:** If you're using Python 3 specifically, you might need:
```bash
pip3 install -r requirements.txt
```

Or if you're using a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
```

---

## Step 2: Install Frontend Dependencies

Open a **new terminal/command prompt** (keep the first one for later) and run:

```bash
cd frontend
npm install
```

This will install all the Node.js packages needed for the frontend.

---

## Step 3: Start the Backend Server

In your **first terminal** (where you installed backend dependencies):

```bash
cd backend
uvicorn app.main:app --reload
```

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend is now running on http://localhost:8000**

**Keep this terminal open!** The backend needs to keep running.

---

## Step 4: Start the Frontend Server

In your **second terminal** (where you installed frontend dependencies):

```bash
cd frontend
npm run dev
```

You should see output like:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

✅ **Frontend is now running on http://localhost:3000**

**Keep this terminal open too!** The frontend needs to keep running.

---

## Step 5: Open the App in Your Browser

Open your web browser and go to:

**http://localhost:3000**

You should see "The Smart Goal Breaker" app!

---

## 🎯 Quick Command Summary

### Terminal 1 (Backend):
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm run dev
```

### Browser:
Open http://localhost:3000

---

## ✅ What You Should See

### In Terminal 1 (Backend):
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### In Terminal 2 (Frontend):
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
```

### In Browser:
- A beautiful UI with "The Smart Goal Breaker" title
- An input form to enter your goal
- Cards to display results

---

## 🛑 How to Stop the App

- **Backend:** Press `CTRL+C` in Terminal 1
- **Frontend:** Press `CTRL+C` in Terminal 2

---

## 🔧 Troubleshooting

### Backend Issues

**Error: "DATABASE_URL environment variable is not set"**
- Make sure you created `backend/.env` file
- Check that the file is in the `backend` folder (not root)
- Verify the file has `DATABASE_URL=postgresql://...`

**Error: "Could not connect to database"**
- Make sure PostgreSQL is running
- Check your connection string in `backend/.env`
- Verify username, password, host, and port are correct

**Error: "Module not found"**
- Run `pip install -r requirements.txt` again
- Make sure you're in the `backend` folder

**Error: "GEMINI_API_KEY not set"**
- Make sure `backend/.env` has `GEMINI_API_KEY=your_key_here`
- Get your API key from https://makersuite.google.com/app/apikey

### Frontend Issues

**Error: "Cannot connect to backend"**
- Make sure backend is running (check Terminal 1)
- Verify `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
- Check that backend is on port 8000

**Error: "Module not found"**
- Run `npm install` again in the `frontend` folder
- Delete `node_modules` and run `npm install` again

**Port 3000 already in use:**
- Close other apps using port 3000
- Or run on a different port: `npm run dev -- -p 3001`

### Database Issues

**Tables not created:**
- The app creates tables automatically on first run
- If issues persist, you can manually run: `python backend/app/init_db.py`

**Database doesn't exist:**
- Create it manually in PostgreSQL:
  ```sql
  CREATE DATABASE goal_breaker;
  ```

---

## 📝 Testing the App

1. Open http://localhost:3000
2. Type a goal like: "Launch a startup"
3. Click "Break Down Goal"
4. Wait a few seconds for AI to process
5. You should see:
   - Your goal
   - Complexity score (1-10)
   - 5 actionable steps

---

## 🎉 Success!

If everything is working:
- ✅ Backend running on port 8000
- ✅ Frontend running on port 3000
- ✅ Can enter goals and see results
- ✅ Goals are saved to database

You're all set! Start breaking down those goals! 🚀

