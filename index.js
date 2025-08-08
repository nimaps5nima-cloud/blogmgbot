const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());

app.post(`/webhook`, async (req, res) => {
  const message = req.body.message;
  if (message && message.text === "/start") {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: "سلام! 👋 به دستیار محتوای حرفه‌ای خوش اومدی 🌟"
      })
    });
  }
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot server running on port ${PORT}`);
});