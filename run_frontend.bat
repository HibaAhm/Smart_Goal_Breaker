@echo off
echo Starting Goal Breaker Frontend...
echo.
cd frontend
echo Installing dependencies...
call npm install
echo.
echo Starting server...
call npm run dev
pause

