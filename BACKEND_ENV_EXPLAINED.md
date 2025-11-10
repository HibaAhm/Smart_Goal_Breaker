# Backend `.env` File - Complete Explanation

## File Location
Create this file at: `backend/.env`

## File Contents

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

---

## Line 1: DATABASE_URL

### What it is:
This is the connection string that tells your Python backend how to connect to your PostgreSQL database.

### Format:
```
postgresql://username:password@host:port/database_name
```

### Breaking it down:

1. **`postgresql://`** - This is the protocol. Always starts with this for PostgreSQL connections.

2. **`YOUR_USERNAME`** - Replace with your PostgreSQL username
   - Common values: `postgres`, `admin`, or a custom username you created
   - Example: `postgres`

3. **`:`** - Separator between username and password

4. **`YOUR_PASSWORD`** - Replace with your PostgreSQL password
   - This is the password you set when you installed PostgreSQL
   - Example: `MyPassword123`

5. **`@`** - Separator between credentials and host

6. **`YOUR_HOST`** - Replace with where your PostgreSQL is running
   - If PostgreSQL is on your computer: `localhost` or `127.0.0.1`
   - If on a remote server: the server's IP address or domain name
   - Example: `localhost`

7. **`:`** - Separator between host and port

8. **`YOUR_PORT`** - Replace with the PostgreSQL port number
   - Default PostgreSQL port is `5432`
   - Usually you don't need to change this
   - Example: `5432`

9. **`/`** - Separator before database name

10. **`YOUR_DATABASE`** - Replace with the name of your database
    - This is the database where your goals and tasks will be stored
    - You can name it anything, like: `goal_breaker`, `goals_db`, `my_goals`
    - If the database doesn't exist, PostgreSQL will try to create it (or you can create it manually)
    - Example: `goal_breaker`

### Complete Example:
```env
DATABASE_URL=postgresql://postgres:MySecurePassword123@localhost:5432/goal_breaker
```

This means:
- Username: `postgres`
- Password: `MySecurePassword123`
- Host: `localhost` (running on your computer)
- Port: `5432` (default PostgreSQL port)
- Database: `goal_breaker`

---

## Line 2: GEMINI_API_KEY

### What it is:
This is your API key for Google's Gemini AI service. The app uses this to break down goals into actionable steps.

### How to get it:

1. Go to: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click the **"Create API Key"** button
4. Copy the key that appears (it will look like a long string of letters and numbers)

### Format:
```
GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Example:
```env
GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
```

**Important Notes:**
- The API key is **FREE** - no credit card required
- Keep it secret - don't share it publicly
- It's a long string that starts with `AIzaSy`

---

## Complete Example File

Here's what your `backend/.env` file should look like with real values:

```env
DATABASE_URL=postgresql://postgres:mypassword123@localhost:5432/goal_breaker
GEMINI_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrstuvwxyz
```

---

## Common Questions

### Q: What if I don't know my PostgreSQL username/password?
**A:** 
- Username is usually `postgres` by default
- Password is what you set during PostgreSQL installation
- If you forgot it, you may need to reset it or check your PostgreSQL installation notes

### Q: What if I haven't created the database yet?
**A:** 
- You can create it manually in PostgreSQL:
  ```sql
  CREATE DATABASE goal_breaker;
  ```
- Or the app will try to create tables automatically (but the database itself must exist)

### Q: Can I use a different port?
**A:** 
- Yes, if your PostgreSQL is configured to use a different port
- But `5432` is the standard default port

### Q: What if my password has special characters?
**A:** 
- You may need to URL-encode special characters
- For example, `@` becomes `%40`, `#` becomes `%23`
- Or use quotes around the password in some cases

### Q: Is the Gemini API key really free?
**A:** 
- Yes! Google provides free API access to Gemini
- There are usage limits, but they're generous for personal projects

---

## Quick Checklist

Before running the backend, make sure:

- [ ] You have PostgreSQL installed and running
- [ ] You know your PostgreSQL username
- [ ] You know your PostgreSQL password
- [ ] You've created the database (or know what name you want to use)
- [ ] You have a Gemini API key from https://makersuite.google.com/app/apikey
- [ ] Your `backend/.env` file has both lines filled in with real values (no placeholders)

---

## Need Help Finding Your PostgreSQL Details?

### On Windows:
- Check if PostgreSQL is running: Look for it in Services or Task Manager
- Default installation usually uses:
  - Username: `postgres`
  - Port: `5432`
  - Host: `localhost`

### On Mac:
- Check with: `psql --version`
- Default installation usually uses:
  - Username: Your Mac username or `postgres`
  - Port: `5432`
  - Host: `localhost`

### On Linux:
- Check with: `sudo systemctl status postgresql`
- Default installation usually uses:
  - Username: `postgres`
  - Port: `5432`
  - Host: `localhost`

