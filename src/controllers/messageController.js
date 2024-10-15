const { sendMessages, findGroups, getContactsGroup } = require('../services/whatsappService');
const { readFileSync } = require('../utils/fileUtils');

const contentFileGroup = 'listGroup';
const contentFileNumber = 'listNumber';
const msnBody = 'msnBody.json';

const handleClientReady = async (client) => {
    try {
        const listGroup = await readFileSync(contentFileGroup); // Importa a lista de grupos
        const listNumber = await readFileSync(contentFileNumber); // Importa a lista de números
        const contentMsnBody = await readFileSync(msnBody); // Importa a mensagem do arquivo JSON
        const data = JSON.parse(contentMsnBody);

        await sendMessages(client, listNumber, listGroup, data);

        // Chame outras funções conforme necessário:
        // getContactsGroup(client);
        // findGroups(client);
    } catch (e) {
        console.error('Erro ao importar o arquivo', e);
    }
};

module.exports = {
    handleClientReady
};
