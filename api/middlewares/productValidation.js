const deleteImage = require('../utils/deleteImage');

const createAndUpdateValidation = (req, res, next) => {

    try {

        const filePath = req.file.path;

        if(!req.body.title ||
            !req.body.price || 
            !req.body.description ||
            !req.body.location || 
            !req.body.contact || 
            !req.body.whatsapp ||
            !req.body.username ||
            !req.body.categoryId){

            deleteImage(filePath)
                
            res.status(400).json({error: "É necessário preencher todos os campos."});
            return;
        }
    } catch (error) {
        res.status(400).json({ error: "Não foi possível cadastrar o produto." })
        return;
    }

    next();
}

module.exports = {
    createAndUpdateValidation,
}