require("dotenv").config();
const jsonwebtoken = require('jsonwebtoken');
const { pool } = require('../db');

const jwtSecret = process.env.JWT_SECRET || "7Dc8uIkop1scb";

const tokenValidated = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error: "Acesso negado!"})
    }

    try {
        const payload = jsonwebtoken.verify(token, jwtSecret);
        const userIdFromToken = typeof payload.user.id !== 'string' && payload.user.id;
        
        if(!payload.user && !userIdFromToken){
            return res.status(401).json({error: "Token inválido!"})
        }

        pool.getConnection(function (err, connection) {
            connection.query("SELECT id, name, phone FROM users WHERE id='"
            + payload.user.id + "' LIMIT 1", function (err, rows) {
                if(!err){
                    req.user = rows[0]; 
                    next();
                }else{
                    return res.status(401).json({error: "Token inválido!"})
                }
            });
        });

    } catch (error) {
        return res.status(401).json({error: "Token inválido!"})
    }

}

module.exports = {
    jwtSecret,
    tokenValidated
}