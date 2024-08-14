const createAndUpdateValidation = (data) => {

    if(!data.title ||
        !data.price || 
        !data.description ||
        !data.location || 
        !data.contact || 
        !data.whatsapp || 
        !data.img ||
        !data.username ||
        !data.categoryId){
        return { error: "É necessário preencher todos os campos." };
    }

    return null;
}

module.exports = {
    createAndUpdateValidation,
}