const { MessageMedia } = require('whatsapp-web.js');
const path = require('path');
const { delay } = require('../utils/delay');
const { readDir } = require('../utils/fileUtils');

const randomTime = (min = 2000, max = 5000) => Math.floor(Math.random() * (max - min + 1)) + min;

const sendMessages = async (client, listNumber, listGroup, data) => {
    const list = listNumber + listGroup;
    const lines = list.split("\n");

    for (let i in lines) {
        if (lines[i].trim() === '') continue;

        setTimeout(async () => {
            const chatId = (lines[i].trim().length < 14) ? lines[i].trim() + "@c.us" : lines[i].trim() + "@g.us";
            const message = ``;

            const contentPath = path.join(__dirname, '../assets/')
            const files = await readDir(contentPath)

            if (files.lenght !== 0) {
                for (let file of files) {
                    const media = MessageMedia.fromFilePath(contentPath + file);
                    await client.sendMessage(chatId, media, { caption: message });
                    console.log(contentPath + file + " - " + lines[i])
                    delay(500)
                }
            } else {
                await client.sendMessage(chatId, message);
                console.log(lines[i])
            }

            await delay(2000);
        }, i * randomTime());
    }
};

const findGroups = async (client) => {
    const chats = await client.getChats();
    const groups = chats.filter(chat => chat.isGroup);
    console.log('Groups:');
    groups.forEach(group => {
        console.log(`ID: ${group.id._serialized}, Name: ${group.name}`);
    });
};

const getContactsGroup = async (client, groupId = '000000000000000000@g.us') => {
    try {
        const chat = await client.getChatById(groupId);
        if (chat.isGroup) {
            const participants = chat.participants;
            participants.forEach(participant => {
                console.log(`ID: ${participant.id._serialized}`);
            });
        } else {
            console.log('O chat fornecido não é um grupo.');
        }
    } catch (err) {
        console.error('Erro ao obter o grupo:', err);
    }
};

module.exports = {
    sendMessages,
    findGroups,
    getContactsGroup
};
