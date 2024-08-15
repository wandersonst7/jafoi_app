const fs = require('fs');

const deleteImage = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Erro ao excluir o arquivo:', err);
        } else {
            console.log('Arquivo excluído com sucesso!');
        }
    });
}

module.exports = deleteImage;