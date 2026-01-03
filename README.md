🐱 WhiskerWise.AI

A Mental Health Chatbot with a Friendly Feline Personality

WhiskerWise.AI is an AI-powered mental health chatbot designed to provide empathetic, supportive conversations in a friendly and approachable way.
It combines Natural Language Processing, Deep Learning, and a clean web interface to create a calm, engaging chat experience.

📘 Project Background & Credits

This project was developed as a First Semester Academic Project by Devansh Sharma, the main developer, as part of his undergraduate journey in Computer Science.

The project was built collaboratively with contributions and support from:

Ayush

Divesh

WhiskerWise.AI represents an early-stage exploration of AI, NLP, and full-stack development, created with a strong focus on learning, experimentation, and real-world problem solving.

✨ Features

🧠 Intent-based NLP chatbot using PyTorch

💬 Empathetic responses for emotions like sadness, stress, anxiety, etc.

🎨 Clean, centered chat UI with background image

🐾 Friendly cat-themed personality

🌐 Web interface powered by Flask

🖥️ Terminal chatbot (chat.py) for quick testing

🔁 Avoids repetitive responses

📜 Scrollable chat history

⚡ Lightweight & beginner-friendly architecture

🛠️ Tech Stack

Backend

Python 3

Flask

PyTorch

NLTK

NumPy

Frontend

HTML

CSS

Vanilla JavaScript

📂 Project Structure
WhiskerWise.AI/
│
├── app.py                 # Flask web server
├── train.py               # Model training script
├── chat.py                # Terminal chatbot
├── intents.json           # Training data (intents & responses)
├── data.pth               # Trained model
├── requirements.txt       # Project dependencies
├── setup.sh               # One-step setup script
│
├── templates/
│   └── index.html         # Web UI
│
├── static/
│   ├── css/
│   │   ├── interface.css
│   │   └── navbar.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       ├── logo.png
│       └── interimg.jpg
│
└── venv/                  # Virtual environment (not committed)

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/WhiskerWise.AI.git
cd WhiskerWise.AI

2️⃣ Run the setup script (recommended)

This script will:

create a virtual environment

install dependencies

download required NLTK data

train the chatbot model

chmod +x setup.sh
./setup.sh

3️⃣ Run the web application
source venv/bin/activate
python app.py


Open your browser at:

http://127.0.0.1:5000

🖥️ Terminal Mode (Optional)

You can also run the chatbot directly in the terminal:

source venv/bin/activate
python chat.py


Type quit to exit.

🧠 How It Works (High Level)

User input is tokenized using NLTK

Input is converted into a bag-of-words vector

A PyTorch neural network predicts the intent

A response is randomly selected from the matched intent

Repeated responses are avoided for better UX

The response is served via a Flask API endpoint

📌 Disclaimer

This chatbot is not a substitute for professional mental health care.
It is intended for educational, experimental, and supportive use only.

🧩 Future Improvements

Conversation memory / context tracking

Emotion intensity detection

Typing indicators

Voice input/output

Mobile-first UI

Deployment to cloud platforms

📜 License

This project is open-source and available under the MIT License.

🐾 Final Note

WhiskerWise.AI was built as a first-semester learning project, blending AI concepts with practical web development.
It reflects curiosity, collaboration, and growth — and it’s only the beginning 😸
