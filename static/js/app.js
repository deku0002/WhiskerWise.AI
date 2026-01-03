class ChatApp {
    constructor() {
        this.messages = [];

        this.chatMessages = document.querySelector(".chatbox__messages");
        this.inputField = document.querySelector(".chat-input input");
        this.sendButton = document.querySelector(".send__button");

        this.bindEvents();
    }

    bindEvents() {
        // Send button click
        this.sendButton.addEventListener("click", () => {
            this.sendMessage();
        });

        // Enter key support
        this.inputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    sendMessage() {
        const text = this.inputField.value.trim();
        if (!text) return;

        // Add user message
        this.messages.push({
            sender: "user",
            text: text
        });

        this.renderMessages();
        this.inputField.value = "";

        // Send to backend
        fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        })
        .then(res => res.json())
        .then(data => {
            this.messages.push({
                sender: "bot",
                text: data.answer || "Meow… I’m here 🐾"
            });
            this.renderMessages();
        })
        .catch(err => {
            console.error("Chat error:", err);
            this.messages.push({
                sender: "bot",
                text: "Meow… something went wrong 🐾"
            });
            this.renderMessages();
        });
    }

    renderMessages() {
        // Clear container
        this.chatMessages.innerHTML = "";

        // Render each message
        this.messages.forEach(msg => {
            const row = document.createElement("div");

            if (msg.sender === "bot") {
                row.className = "messages__item messages__item--visitor";
                row.innerHTML = `
                    <img src="/static/images/logo.png" class="avatar" alt="bot">
                    <div class="message-bubble bot">${this.escapeHTML(msg.text)}</div>
                `;
            } else {
                row.className = "messages__item messages__item--operator";
                row.innerHTML = `
                    <div class="message-bubble user">${this.escapeHTML(msg.text)}</div>
                `;
            }

            this.chatMessages.appendChild(row);
        });

        // 🔥 FORCE SCROLL AFTER DOM UPDATE
        requestAnimationFrame(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        });
    }

    // Prevent HTML injection / layout break
    escapeHTML(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ChatApp();
});
