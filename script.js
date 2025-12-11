const messageInput = document.getElementById("messageInput"); // your input field
const sendButton = document.getElementById("sendButton"); // your send button

sendButton.addEventListener("click", async () => {
  const message = messageInput.value;

  await fetch("https://eob32xrk3hxwxro.m.pipedream.net", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }) // MUST be { message: "..." }
  });

  messageInput.value = "";
});
