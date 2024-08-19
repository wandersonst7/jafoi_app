require("dotenv").config();
const User = require('../models/User');
const { loginValidation, registerValidation } = require('../middlewares/authValidation');

const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Autorização
        const role = 'USER';

        const validation = registerValidation(req.body);

        if(validation){
            return res.status(400).json(validation)
        }
        
        // verfificando se já existe o numero de telefone
        const user = await User.findOne({ phone });

        if(user) {
            return res.status(400).json({error: "O número de telefone já está cadastrado."});
        }

        // Gerando hash da senha
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Criando usuário
        const newUser = await User.create({
            name,
            phone,
            password: passwordHash,
            role
        })

        // Verificando se o usuário foi cadastrado
        if(!newUser){
            return res.status(400).json({error: "Ocorreu um erro ao realizar o registro do usuário."});
        }
        
        // Token
        const payloadToken = {
            id: newUser._id,
            phone: newUser.phone,
        }

        const token = jsonwebtoken.sign(
            { user: payloadToken },
            jwtSecret,
            { expiresIn: '7d'}
        );

        // Dados do usuário
        const returnUser = {
            id: newUser._id,
            phone: newUser.phone,
            name: newUser.name,
            role: newUser.role,
        }

        return res.status(201).json({data: {
            user: returnUser,
            token: token
        }});

    } catch (error) {
        return res.status(400).json({error: "Ocorreu um erro ao realizar o registro do usuário."})
    }
}

const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const validation = loginValidation(req.body);

        if(validation){
            return res.status(400).json(validation)
        }
        
        const user = await User.findOne({ phone });

        if(!user){
            return res.status(400).json({error: "Número de telefone ou senha incorreta."});
        }

        if(!(await bcrypt.compare(password, user.password))){
            return res.status(400).json({error: "Número de telefone ou senha incorreta."});
        }

        // Token
        const payloadToken = {
            id: user._id,
            phone: user.phone,
        }

        const token = jsonwebtoken.sign(
            { user: payloadToken },
            jwtSecret,
            { expiresIn: '7d'}
        );

        const returnUser = {
            _id: user._id,
            phone: user.phone,
            name: user.name,
            role: user.role,
        }
        
        return res.status(200).json({ data: {
            user: returnUser,
            token: token
        }});


    } catch (error) {
        return res.status(400).json({error: "Ocorreu um erro ao realizar o login."})
    }
}

const tokenVerifyAndGetUserData = async (req, res) => {
    const { token } = req.body;

    if(!token){
        return res.status(401).json({error: "Acesso negado!"});
    }

    try {
        const payload = jsonwebtoken.verify(token, jwtSecret);
        
        if(!payload.user){
            return res.status(401).json({error: "Token inválido!"})
        }

        const user = await User.findById(payload.user.id).select("-password -createdAt -updatedAt -__v");

        // Verificando se o usuário existe
        if(!user){
            return res.status(401).json({error: "Token inválido!"})
        }

        return res.status(200).json({data: { user }});

    } catch (error) {
        return res.status(401).json({error: "Token inválido!"})
    }

}

module.exports = {
    login,
    register,
    tokenVerifyAndGetUserData
}