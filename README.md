# WhatsApp GPT Bot

A WhatsApp bot that can **tag all group members** and **answer questions using ChatGPT**. Built with Node.js and `whatsapp-web.js`.

---

## Features
- `!tagall` → Mentions all members in a group chat.
- `!ask <question>` → Sends the question to ChatGPT API and replies with the answer.
- Runs on Node.js, can be deployed on Railway or other cloud hosts.

---

## Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/whatsapp-gpt-bot.git
cd whatsapp-gpt-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set environment variables**
- Create a `.env` file locally:
```
OPENAI_API_KEY=your_openai_api_key_here
```
> Do not commit `.env` to GitHub. Use Railway environment variables when deploying.

4. **Run the bot locally**
```bash
node index.js
```
- Scan the QR code with WhatsApp on first run.

---

## Commands
- `!tagall` → Tags all members in the group.
- `!ask <question>` → Sends a question to ChatGPT and replies with the answer.

---

## Deployment on Railway
1. Create a new project and deploy from GitHub.
2. Add environment variable `OPENAI_API_KEY` in Railway settings.
3. Run the bot. First-time QR scan may be required if session data is not uploaded.

---

## Notes
- Do not push `.env` or `.wwebjs_auth/` to public repos.
- Use LocalAuth to store WhatsApp session locally.
- Ensure dependencies in `package.json` are installed.

---

This bot can be extended with more commands and features easily.
