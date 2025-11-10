# Where to Put Your Credentials - Simple Guide

## ✅ All Credentials Go in ONE File: `backend/.env`

You don't need multiple files! Everything goes in **one single file** called `.env` in the `backend` folder.

---

## 📁 File Location

```
goal_braker/
└── backend/
    └── .env  ← CREATE THIS FILE HERE
```

---

## 📝 What Goes in `backend/.env`

Create the file `backend/.env` and put **everything** in it:

```env
DATABASE_URL=postgresql://username:password@host:port/database_name
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🔍 Breaking Down the DATABASE_URL Line

All your PostgreSQL details go on **ONE line** in this format:

```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

### Example with Real Values:

Let's say you have:
- Username: `postgres`
- Password: `mypassword123`
- Host: `localhost`
- Port: `5432`
- Database: `goal_breaker`

**You write it like this (all on one line):**

```env
DATABASE_URL=postgresql://postgres:mypassword123@localhost:5432/goal_breaker
```

**NOT like this (separate lines):**
```env
❌ WRONG - Don't do this:
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=mypassword123
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=goal_breaker
```

---

## 📋 Step-by-Step: How to Fill It In

### Step 1: Create the File
1. Go to the `backend` folder
2. Create a new file named `.env` (yes, it starts with a dot)

### Step 2: Write the DATABASE_URL Line
Replace the placeholders with your actual values:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
```

**Example:**
If your details are:
- Username: `john`
- Password: `secret123`
- Host: `localhost`
- Port: `5432`
- Database: `my_goals`

Then write:
```env
DATABASE_URL=postgresql://john:secret123@localhost:5432/my_goals
```

### Step 3: Add Your Gemini API Key
```env
GEMINI_API_KEY=paste_your_key_here
```

---

## ✅ Complete Example File

Here's what a complete `backend/.env` file looks like:

```env
DATABASE_URL=postgresql://postgres:mypassword123@localhost:5432/goal_breaker
GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
```

That's it! Just 2 lines total.

---

## 🎯 Quick Reference

| What You Have | Where It Goes | Example |
|--------------|---------------|---------|
| PostgreSQL Username | Inside DATABASE_URL (after `postgresql://`) | `postgres` |
| PostgreSQL Password | Inside DATABASE_URL (after username, before `@`) | `mypassword123` |
| PostgreSQL Host | Inside DATABASE_URL (after `@`) | `localhost` |
| PostgreSQL Port | Inside DATABASE_URL (after host, before `/`) | `5432` |
| Database Name | Inside DATABASE_URL (after `/`) | `goal_breaker` |
| Gemini API Key | On separate line: `GEMINI_API_KEY=` | `AIzaSyB...` |

---

## 📝 Template to Copy-Paste

Copy this and fill in your values:

```env
DATABASE_URL=postgresql://[USERNAME]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
GEMINI_API_KEY=[YOUR_API_KEY]
```

**Replace:**
- `[USERNAME]` with your PostgreSQL username
- `[PASSWORD]` with your PostgreSQL password
- `[HOST]` with `localhost` (usually)
- `[PORT]` with `5432` (usually)
- `[DATABASE]` with your database name
- `[YOUR_API_KEY]` with your Gemini API key

---

## ❓ Common Questions

### Q: Do I need separate files for username, password, etc.?
**A:** No! Everything goes in one file: `backend/.env`

### Q: Can I put them on separate lines?
**A:** No, the DATABASE_URL must be on one line. All the connection details are combined into one string.

### Q: What if I don't know my PostgreSQL details?
**A:** 
- **Username:** Usually `postgres` (default)
- **Password:** What you set when installing PostgreSQL
- **Host:** `localhost` if PostgreSQL is on your computer
- **Port:** `5432` (default)
- **Database:** You can name it anything, like `goal_breaker`

### Q: Where do I get the Gemini API key?
**A:** Go to https://makersuite.google.com/app/apikey and create a free API key

---

## 🚀 After Creating the File

Once you've created `backend/.env` with your actual values:

1. Save the file
2. Install dependencies: `pip install -r requirements.txt`
3. Run the backend: `uvicorn app.main:app --reload`

The app will automatically read the `.env` file and use your credentials!

