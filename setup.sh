#!/bin/bash

echo "=============================="
echo "🐱 WhiskerWise.AI Setup Script"
echo "=============================="

# Exit immediately if something fails
set -e

# Check Python
if ! command -v python3 &> /dev/null
then
    echo "❌ Python3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Python found"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
else
    echo "📦 Virtual environment already exists"
fi

# Activate virtual environment
echo "🚀 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Download NLTK data
echo "🧠 Downloading NLTK data..."
python - <<EOF
import nltk
nltk.download('punkt')
EOF

# Train the model
echo "🤖 Training chatbot model..."
python train.py

echo "=============================="
echo "✅ Setup complete!"
echo
echo "Next steps:"
echo "1) Activate venv:  source venv/bin/activate"
echo "2) Run server:    python app.py"
echo "3) Open browser:  http://127.0.0.1:5000"
echo "=============================="
