document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");
  
    function addMessage(message, sender) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message", sender);
  
      if (sender === "bot") {
        const profilePic = document.createElement("img");
        profilePic.src = './images/logo.png';
        ; // Replace with actual image path
        profilePic.alt = "Bot Profile";
        profilePic.classList.add("profile-pic");
        messageElement.appendChild(profilePic);
      }
  
      const messageText = document.createElement("div");
      messageText.classList.add("message-text");
      messageText.innerText = message;
      messageElement.appendChild(messageText);
  
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function handleMessage() {
      const userMessage = messageInput.value.trim();
      if (userMessage) {
        addMessage(userMessage, "user");
        messageInput.value = "";
  
        setTimeout(() => {
          addMessage("MEOW Meow!!!", "bot");
        }, 1000);
      }
    }
  
    sendBtn.addEventListener("click", handleMessage);
  
    messageInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleMessage();
      }
    });
  });
  