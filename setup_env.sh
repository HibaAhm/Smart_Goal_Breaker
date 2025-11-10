#!/bin/bash
# Bash script to create .env files
# Run this script: chmod +x setup_env.sh && ./setup_env.sh

echo "Creating environment files..."

# Create backend .env file
cat > backend/.env << 'EOF'
# PostgreSQL Database Configuration
# Replace the values below with your actual PostgreSQL connection details
# Format: postgresql://username:password@host:port/database_name
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE

# Gemini API Key
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
EOF

echo "✓ Created backend/.env"

# Create frontend .env.local file
cat > frontend/.env.local << 'EOF'
# Backend API URL
# This should point to your FastAPI backend (default: http://localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

echo "✓ Created frontend/.env.local"

echo ""
echo "Files created! Now edit them with your actual values:"
echo "  1. Edit backend/.env - Add your PostgreSQL connection and Gemini API key"
echo "  2. Edit frontend/.env.local - Usually doesn't need changes"

