const createAndUpdateValidation = (req, method) => {

    if(!req.file && method === "create"){
        return { error: "A imagem é obrigatória." };
    }

    if(!req.body.title ||
        !req.body.price || 
        !req.body.description ||
        !req.body.location || 
        !req.body.contact || 
        !req.body.whatsapp ||
        !req.body.username ||
        !req.body.categoryId){
        return { error: "É necessário preencher todos os campos." };
    }

    return null;
}

module.exports = {
    createAndUpdateValidation,
}