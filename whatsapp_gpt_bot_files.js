// This is a representation of the folder structure and files for your WhatsApp GPT Bot

// 1. index.js (main bot code)
/*
Place the following in index.js
*/
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import axios from 'axios';
import 'dotenv/config';

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => { qrcode.generate(qr, { small: true }); console.log('Scan QR code!'); });
client.on('ready', () => { console.log('✅ WhatsApp bot is ready!'); });

async function askChatGPT(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.choices[0].message.content;
    } catch (err) {
        console.error('ChatGPT API error:', err.response?.data || err.message);
        return '⚠️ Could not process your request.';
    }
}

client.on('message', async msg => {
    const chat = await msg.getChat();

    if (msg.body === '!tagall' && chat.isGroup) {
        let text = '', mentions = [];
        for (let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }

    if (msg.body.startsWith('!ask')) {
        const question = msg.body.replace('!ask', '').trim();
        if (!question) return msg.reply('❓ Please provide a question');
        msg.reply('🤔 Thinking...');
        const answer = await askChatGPT(question);
        msg.reply(answer);
    }
});

client.initialize();

// 2. package.json
/*
{
  "name": "whatsapp-gpt-bot",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "dependencies": {
    "whatsapp-web.js": "latest",
    "qrcode-terminal": "latest",
    "axios": "latest",
    "dotenv": "latest"
  }
}
*/

// 3. .gitignore
/*
node_modules/
.env
.wwebjs_auth/
*/

// 4. .env (local only, do NOT upload)
/*
OPENAI_API_KEY=your_openai_api_key_here
*/
