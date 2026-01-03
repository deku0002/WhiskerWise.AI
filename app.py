from flask import Flask, request, jsonify, render_template
import torch
import random
import json

from model import NeuralNet
from nltk_utils import tokenize, bag_of_words

# --------------------
# App setup
# --------------------
app = Flask(__name__)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# --------------------
# Load intents
# --------------------
with open("intents.json", "r") as f:
    intents = json.load(f)

# --------------------
# Load trained model
# --------------------
FILE = "data.pth"
data = torch.load(FILE, map_location=DEVICE)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(DEVICE)
model.load_state_dict(model_state)
model.eval()

# --------------------
# Simple response memory
# --------------------
last_response = None

# --------------------
# Routes
# --------------------

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    global last_response

    data = request.get_json()
    sentence = data.get("message", "").strip()

    if not sentence:
        return jsonify({"answer": "Meow… say something and I’ll listen 🐾"})

    # NLP preprocessing
    tokens = tokenize(sentence)
    X = bag_of_words(tokens, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(DEVICE)

    # Model prediction
    with torch.no_grad():
        output = model(X)
        _, predicted = torch.max(output, dim=1)

        tag = tags[predicted.item()]
        probabilities = torch.softmax(output, dim=1)
        confidence = probabilities[0][predicted.item()].item()

    # ---------- DEBUG (optional) ----------
    print(f"TAG: {tag} | CONF: {confidence:.2f}")

    # ---------- Intent handling ----------
    if confidence > 0.5:   # LOWER threshold (important)
        for intent in intents["intents"]:
            if intent["tag"] == tag:
                responses = intent["responses"]

                # Avoid repeating same response
                response = random.choice(responses)
                if last_response and len(responses) > 1:
                    while response == last_response:
                        response = random.choice(responses)

                last_response = response
                return jsonify({"answer": response})

    # ---------- Fallback ----------
    fallback_responses = [
        "Meow… I’m here with you. Want to tell me more? 🐾",
        "That sounds heavy. I’m listening.",
        "I might not fully understand yet, but I care.",
        "You’re not alone. I’m right here."
    ]

    response = random.choice(fallback_responses)
    last_response = response
    return jsonify({"answer": response})


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


# --------------------
# Run server
# --------------------
if __name__ == "__main__":
    app.run(debug=True)
