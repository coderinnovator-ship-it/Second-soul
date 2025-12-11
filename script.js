const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// Your deployed Pipedream workflow URL
const WEBHOOK_URL = "https://eob32xrk3hxwxro.m.pipedream.net";

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div class="user-msg">You: ${message}</div>`;
  messageInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // SEND correct JSON
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }) // ← must be { message: "..." }
    });

    const data = await response.json(); // parse JSON from workflow
    const text = data.reply || "No response from AI.";

    chatBox.innerHTML += `<div class="ai-msg">AI: ${text}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `<div class="ai-msg">AI: Server error. Try again later.</div>`;
    console.error(err);
  }
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
