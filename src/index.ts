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

Welcome to the official **Mega Poster** Telegram bot 🎉

Here's what you can do:
📝 Compose posts once and publish to multiple platforms (Twitter, Telegram, LinkedIn, and more).
🔗 Connect your social media accounts in the dashboard.
📅 Schedule posts for later.
📊 Track your post performance with detailed analytics.

To get started:
1. Add me (https://t.me/megaposterofficialbot) as an administrator to your channel
2. Make sure I have permission to post messages
3. Visit http://localhost:3000/settings/accounts
4. Click on info button in Telegram section and follow the instructions

Go to the web app at http://localhost:3000/settings/accounts to learn more.

See you there! 🚀
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
