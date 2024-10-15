#!/usr/bin/node

const { Client, LocalAuth } = require('whatsapp-web.js');
const { handleClientReady } = require('./src/controllers/messageController');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');
    await handleClientReady(client);
});

client.on('message', message => {
    console.log('');
    console.log(message.from);
    console.log(message.body);
    console.log(message.id.participant);
});

client.initialize();
