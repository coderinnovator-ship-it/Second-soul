async function getAIResponse(message) {
    const response = await fetch("https://eob32xrk3hxwxro.m.pipedream.net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
}
