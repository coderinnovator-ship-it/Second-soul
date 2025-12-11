// Get references to HTML elements
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

// Your Pipedream webhook URL
const WEBHOOK_URL = "https://eob32xrk3hxwxro.m.pipedream.net";

// Function to send message
async function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Show user's message in chat
    chatBox.innerHTML += `<div class="user-msg">You: ${message}</div>`;
    messageInput.value = "";

    try {
        // Send message to Pipedream
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Show AI reply in chat
        chatBox.innerHTML += `<div class="ai-msg">AI: ${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // auto scroll to latest
    } catch (err) {
        chatBox.innerHTML += `<div class="ai-msg">AI: Error connecting to server.</div>`;
        console.error(err);
    }
}

// Add click listener to Send button
sendBtn.addEventListener("click", sendMessage);

// Add Enter key support
messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
