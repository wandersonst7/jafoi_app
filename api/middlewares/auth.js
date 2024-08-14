require("dotenv").config();
const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const tokenValidate = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error: "Acesso negado!"})
    }

    try {
    
        const payload = jsonwebtoken.verify(token, jwtSecret);

        req.user = await User.findById(payload.user.id).select("-password");

        next();
        
    } catch (error) {
        return res.status(401).json({error: "Token inválido."})
    }

}

module.exports = {
    tokenValidate
}