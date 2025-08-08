const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());

app.post(`/webhook`, async (req, res) => {
  const message = req.body.message;

  if (!message || !message.text) {
    return res.sendStatus(200); // بدون پاسخ
  }

  const chatId = message.chat.id;
  const userText = message.text;
  let responseText = "🤔 متوجه نشدم چی گفتی";

  if (userText === "/start") {
    responseText = `سلام ${message.from.first_name} 👋 به بات تولید محتوای حرفه‌ای خوش اومدی`;
  } else if (userText.toLowerCase().includes("سلام")) {
    responseText = "سلام به روی ماهت 😍";
  } else {
    responseText = `تو گفتی: ${userText}`;
  }

  // ارسال پاسخ به تلگرام
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: responseText,
  });

  res.sendStatus(200);
});

// اجرای سرور
app.listen(PORT, () => {
  console.log(`✅ Bot server running on port ${PORT}`);
});