const fs = require('fs').promises;

const readFileSync = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        return data;
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        throw err;
    }
};

const fileExists = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch (err) {
        return false;
    }
};

const readDir = async (path) => {
    // Lê os arquivos no diretório
    try {
        const data = await fs.readdir(path);
        return data;
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        throw err;
    }
}

module.exports = {
    readFileSync,
    fileExists,
    readDir
};
