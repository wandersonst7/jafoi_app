const loginValidation = (data) => {

    if(!data.phone || !data.password){
        return { error: "É necessário preencher todos os campos." };
    }

    if(data.phone.length !== 15){
        return { error: "Insira um número de telefone válido." };
    }

    return null;

}

const registerValidation = (data) => {

    if(!data.name || !data.phone || !data.password){
        return { error: "É necessário preencher todos os campos." };
    }

    if(data.name.length > 50){
        return { error: "O nome precisa ter no máximo 50 caracteres." };
    }

    if(data.name.length < 5){
        return { error: "O nome precisa ter no mínimo 5 caracteres." };
    }
    
    if(data.phone.length !== 15){
        return { error: "Insira um número de telefone válido." };
    }

    if(data.password.length < 8){
        return { error: "A senha precisa ter no mínimo 8 caracteres." };
    }

    return null;
}

module.exports = {
    loginValidation,
    registerValidation
}