# PowerShell script to create .env files
# Run this script: .\setup_env.ps1

Write-Host "Creating environment files..." -ForegroundColor Green

# Create backend .env file
$backendEnv = @"
# PostgreSQL Database Configuration
# Replace the values below with your actual PostgreSQL connection details
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE

# Gemini API Key
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
"@

$backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8
Write-Host "✓ Created backend\.env" -ForegroundColor Green

# Create frontend .env.local file
$frontendEnv = @"
# Backend API URL
# This should point to your FastAPI backend (default: http://localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000
"@

$frontendEnv | Out-File -FilePath "frontend\.env.local" -Encoding utf8
Write-Host "✓ Created frontend\.env.local" -ForegroundColor Green

Write-Host "`nFiles created! Now edit them with your actual values:" -ForegroundColor Yellow
Write-Host "  1. Edit backend\.env - Add your PostgreSQL connection and Gemini API key" -ForegroundColor Yellow
Write-Host "  2. Edit frontend\.env.local - Usually doesn't need changes" -ForegroundColor Yellow

