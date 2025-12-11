const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// ← Your Pipedream workflow URL
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

    const text = await response.text();
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
