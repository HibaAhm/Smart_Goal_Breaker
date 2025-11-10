# Frontend `.env.local` File - Complete Explanation

## File Location
Create this file at: `frontend/.env.local`

---

## File Contents

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

That's it! Just **one line**.

---

## What It Does

This tells your Next.js frontend where to find your backend API.

- `NEXT_PUBLIC_API_URL` - This is the environment variable name (must start with `NEXT_PUBLIC_` for Next.js to expose it to the browser)
- `http://localhost:8000` - This is where your FastAPI backend is running

---

## When to Change It

### ✅ Usually DON'T Change It
If your backend runs on `http://localhost:8000` (the default), you don't need to change anything.

### 🔧 Change It If:
- Your backend runs on a different port (e.g., `8001`, `3001`)
- Your backend is on a different computer/server
- You're deploying to production

---

## Examples

### Default (Most Common):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### If Backend is on Port 8001:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### If Backend is on a Different Computer:
```env
NEXT_PUBLIC_API_URL=http://192.168.1.100:8000
```

### For Production:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Quick Setup

1. Go to the `frontend` folder
2. Create a file named `.env.local`
3. Add this line:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Save the file

That's it! You're done.

---

## Important Notes

- ✅ The file must be named `.env.local` (starts with a dot)
- ✅ Must be in the `frontend` folder
- ✅ The variable name must start with `NEXT_PUBLIC_` (this is a Next.js requirement)
- ✅ No spaces around the `=` sign
- ✅ No quotes needed around the URL

---

## Complete Example File

Your `frontend/.env.local` file should look exactly like this:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Just one line, that's all!

---

## How It Works

When your frontend makes API calls (like creating a goal), it will use this URL to connect to your backend.

For example, when you create a goal, the frontend will send a request to:
```
http://localhost:8000/api/goals
```

---

## Troubleshooting

### Frontend can't connect to backend?
- Make sure your backend is running (`uvicorn app.main:app --reload`)
- Check that the port matches (default is `8000`)
- Verify the URL in `.env.local` is correct
- Make sure there are no typos

### Still not working?
- Restart your Next.js dev server after changing `.env.local`
- Check the browser console for errors
- Verify your backend is accessible at the URL you specified

