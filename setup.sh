#!/usr/bin/env bash
set -e

echo "🌊 ========================================================"
echo "   प्रहार (PRAHAR) - Local Development Environment Setup    "
echo "========================================================"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

echo "📦 1. Setting up Ingestion Microservice..."
cd services/ingestion
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ../..

echo "🧠 2. Setting up Core FastAPI Engine..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
cd ..

echo "🎨 3. Setting up Frontend..."
if [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    cd frontend
    npm install
    cd ..
fi

echo "✅ Setup Complete!"
echo "To run the platform:"
echo "  1. Ingestion: cd services/ingestion && source venv/bin/activate && uvicorn app.main:app --port 8001 --reload"
echo "  2. Backend:   cd backend && source venv/bin/activate && uvicorn app.main:app --port 8000 --reload"
echo "  3. Frontend:  cd frontend && npm run dev"
