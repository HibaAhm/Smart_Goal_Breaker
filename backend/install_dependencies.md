# Installing Dependencies - Python 3.13 Fix

## Problem
Python 3.13 is very new and some packages don't have pre-built wheels yet, causing compilation errors.

## Solutions

### Option 1: Use Updated Requirements (Recommended)

I've updated `requirements.txt` to use newer versions. Try:

```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

### Option 2: Install Without Version Pinning

If that doesn't work, install latest versions:

```bash
cd backend
pip install fastapi uvicorn[standard] sqlalchemy psycopg2-binary pydantic pydantic-settings python-dotenv google-generativeai python-multipart
```

### Option 3: Use Python 3.11 or 3.12 (Most Reliable)

Python 3.11 or 3.12 have better package support:

1. Install Python 3.11 or 3.12 from python.org
2. Create a virtual environment:
   ```bash
   python3.11 -m venv venv
   # or
   python3.12 -m venv venv
   ```
3. Activate it:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Option 4: Install Rust (For Compilation)

If you want to stick with Python 3.13, install Rust:

1. Go to https://rustup.rs/
2. Install Rust
3. Restart terminal
4. Try installing again:
   ```bash
   pip install -r requirements.txt
   ```

## After Installation

Once packages are installed, run:

```bash
uvicorn app.main:app --reload
```

Or if uvicorn still not found:

```bash
python -m uvicorn app.main:app --reload
```

