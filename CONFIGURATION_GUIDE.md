# 🔧 Configuration Guide

Everything is set up! You just need to add your PostgreSQL and Gemini API credentials.

## What You Need to Provide

### 1. PostgreSQL Connection Details

You need these 5 pieces of information:
- **Username** (e.g., `postgres`)
- **Password** (your PostgreSQL password)
- **Host** (usually `localhost` or `127.0.0.1`)
- **Port** (usually `5432`)
- **Database Name** (e.g., `goal_breaker`)

**Format:** `postgresql://username:password@host:port/database_name`

**Example:**
```
postgresql://postgres:mypassword123@localhost:5432/goal_breaker
```

### 2. Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (looks like: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

---

## How to Create the Files

### Option 1: Use the Setup Script (Easiest)

**Windows (PowerShell):**
```powershell
.\setup_env.ps1
```

**Mac/Linux:**
```bash
chmod +x setup_env.sh
./setup_env.sh
```

Then edit the created files with your actual values.

### Option 2: Create Manually

#### Backend `.env` file

**Location:** `backend/.env`

**Content:**
```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

**Replace the placeholders:**
- `YOUR_USERNAME` → Your PostgreSQL username
- `YOUR_PASSWORD` → Your PostgreSQL password
- `YOUR_HOST` → Usually `localhost`
- `YOUR_PORT` → Usually `5432`
- `YOUR_DATABASE` → Your database name (e.g., `goal_breaker`)
- `YOUR_GEMINI_API_KEY_HERE` → Your Gemini API key

#### Frontend `.env.local` file

**Location:** `frontend/.env.local`

**Content:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

(Usually doesn't need to change)

---

## Example Configuration

Here's what your files should look like with real values:

### `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:MySecurePassword123@localhost:5432/goal_breaker
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## After Configuration

1. **Install Backend Dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Run Backend:**
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

4. **Run Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open Browser:**
   Go to http://localhost:3000

---

## Need Help?

If you're not sure about your PostgreSQL details:
- **Username:** Usually `postgres` by default
- **Password:** The one you set when installing PostgreSQL
- **Host:** `localhost` if running locally
- **Port:** `5432` is the default PostgreSQL port
- **Database:** You may need to create it first: `CREATE DATABASE goal_breaker;`

