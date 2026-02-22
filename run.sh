#!/bin/bash

# Honey Ecosystem - Linux/Render Runner Script

echo "🍯 Starting Honey Ecosystem Deployment Script..."

# ── [1] Backend Setup ─────────────────────────────────────────
echo "📦 Setting up Backend..."
cd backend/honey

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate venv and install requirements
source venv/bin/activate
pip install --upgrade pip
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Run migrations
echo "⚙️ Running Django Migrations..."
python manage.py migrate --run-syncdb

# ── [2] Frontend Setup ────────────────────────────────────────
echo "📦 Setting up Frontend..."
cd ../../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node modules..."
    npm install
fi

# ── [3] Start Services ────────────────────────────────────────
# Note: For Render, you might want to run these differently.
# This script defaults to running backend on 8000 and frontend on 5173.

echo "🚀 Launching Services..."

# Run backend in background
cd ../backend/honey
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000 &

# Run frontend in foreground
cd ../../frontend
npx vite --host 0.0.0.0 --port 5173
