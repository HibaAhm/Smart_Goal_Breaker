# Database Tables Setup

## Good News: Tables Should Auto-Create! 🎉

The app **automatically creates tables** when the backend starts. You don't need to create them manually!

The code in `backend/app/main.py` has:
```python
Base.metadata.create_all(bind=engine)
```

This creates the tables automatically when the backend starts.

---

## If Tables Weren't Created

If for some reason the tables weren't created automatically, here's how to create them manually:

### Option 1: Let the App Create Them (Recommended)

Just restart your backend:
```bash
# Stop backend (CTRL+C)
# Then start it again
python -m uvicorn app.main:app --reload
```

The tables should be created automatically on startup.

---

### Option 2: Create Manually with SQL

If you want to create them manually, run this SQL in your PostgreSQL database:

```sql
-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    goal_text VARCHAR NOT NULL,
    complexity_score FLOAT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL,
    task_text TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_goal_id ON tasks(goal_id);
CREATE INDEX IF NOT EXISTS idx_goals_created_at ON goals(created_at);
```

**How to run SQL:**
- Using psql command line:
  ```bash
  psql -U your_username -d goal_breaker -f create_tables.sql
  ```
- Using pgAdmin (GUI tool)
- Using any PostgreSQL client

---

## Tables Structure

### 1. `goals` Table
Stores the main goals:
- `id` - Primary key (auto-increment)
- `goal_text` - The goal text (e.g., "Launch a startup")
- `complexity_score` - Complexity score from 1-10
- `created_at` - Timestamp when goal was created

### 2. `tasks` Table
Stores the 5 actionable steps for each goal:
- `id` - Primary key (auto-increment)
- `goal_id` - Foreign key linking to goals table
- `task_text` - The task description
- `order` - Order of the task (1-5)

---

## Verify Tables Exist

To check if tables were created:

```sql
-- List all tables
\dt

-- Or
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see:
- `goals`
- `tasks`

---

## Quick Fix

**Just restart your backend!** The tables should be created automatically.

```bash
# In backend terminal
CTRL+C  # Stop
python -m uvicorn app.main:app --reload  # Start again
```

Check the terminal output - you might see messages about table creation.

---

## Still Not Working?

If tables still don't exist after restarting:

1. **Check database connection** - Make sure `DATABASE_URL` in `.env` is correct
2. **Check permissions** - Your PostgreSQL user needs CREATE TABLE permission
3. **Check database exists** - Make sure the database name in `DATABASE_URL` exists
4. **Create manually** - Use the SQL script above

---

## Summary

✅ **Recommended:** Just restart backend - tables auto-create  
✅ **Alternative:** Run the SQL script manually if needed

The app is designed to handle table creation automatically, so you shouldn't need to do anything manually!

