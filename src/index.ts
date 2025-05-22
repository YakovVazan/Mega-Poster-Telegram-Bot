import http from "http";
import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";

config();

const PORT = process.env.PORT || 3000;
const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg: any) => {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || "there";

  const welcomeMessage = `
👋 Hi ${firstName}!

Welcome to **Mega Poster** 🎉

Here's what you can do:
📝 Compose posts once and publish to multiple platforms (Twitter, Telegram, LinkedIn, and more).
🔗 Connect your social media accounts in the dashboard.
📅 Schedule posts for later.

To get started:
1. Visit our web app.
2. Log in and connect your social accounts.
3. Start posting!

Need help? Just send /help.

Let’s go 🚀
`;

  bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

http
  .createServer((_, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Mega Poster Telegram Bot is running.\n");
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
