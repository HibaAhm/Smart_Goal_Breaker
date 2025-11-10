@echo off
echo Starting Goal Breaker Backend...
echo.
cd backend
echo Installing dependencies...
pip install -r requirements.txt
echo.
echo Starting server...
uvicorn app.main:app --reload
pause

