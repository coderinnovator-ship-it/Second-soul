const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// Pipedream webhook URL
const WEBHOOK_URL = "https://eob32xrk3hxwxro.m.pipedream.net";

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div class="user-msg">You: ${message}</div>`;
  messageInput.value = "";

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div class="ai-msg">AI: ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div class="ai-msg">AI: Error connecting to server.</div>`;
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
