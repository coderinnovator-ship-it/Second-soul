const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Your OpenAI API key (keep private, for production use server-side)
const OPENAI_API_KEY = "YOUR_API_KEY_HERE"; // ← replace with your key

async function getAIResponse(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 200
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage(message, 'user');
    userInput.value = '';

    const aiResponse = await getAIResponse(message);
    addMessage(aiResponse, 'ai');
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
