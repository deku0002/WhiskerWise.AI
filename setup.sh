#!/bin/bash

echo "====================================="
echo "🐱 WhiskerWise.AI - Full Auto Setup"
echo "====================================="

set -e

# -----------------------------
# Check Python
# -----------------------------
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Install Python 3.8+"
    exit 1
fi

echo "✅ Python3 detected"

# -----------------------------
# Create venv
# -----------------------------
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
else
    echo "📦 Virtual environment already exists"
fi

# -----------------------------
# Activate venv
# -----------------------------
echo "🚀 Activating virtual environment..."
source venv/bin/activate

# -----------------------------
# Upgrade pip
# -----------------------------
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# -----------------------------
# Install requirements
# -----------------------------
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# -----------------------------
# Download NLTK data
# -----------------------------
echo "🧠 Downloading NLTK data..."
python - <<EOF
import nltk
nltk.download('punkt')
EOF

# -----------------------------
# Create nltk_utils.py if missing
# -----------------------------
if [ ! -f "nltk_utils.py" ]; then
    echo "🛠️ Creating missing nltk_utils.py..."

    cat << 'EOF' > nltk_utils.py
import nltk
import numpy as np
from nltk.stem.porter import PorterStemmer

stemmer = PorterStemmer()

def tokenize(sentence):
    return nltk.word_tokenize(sentence)

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0
    return bag
EOF

    echo "✅ nltk_utils.py created"
else
    echo "✅ nltk_utils.py already exists"
fi

# -----------------------------
# Train model
# -----------------------------
echo "🤖 Training chatbot model..."
python train.py

# -----------------------------
# Done
# -----------------------------
echo "====================================="
echo "✅ Setup completed successfully!"
echo
echo "Next steps:"
echo "1) Activate venv: source venv/bin/activate"
echo "2) Run server:   python app.py"
echo "3) Open browser: http://127.0.0.1:5000"
echo "====================================="
