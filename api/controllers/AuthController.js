const { pool } = require('../db');
const { jwtSecret } = require('../middlewares/auth');
const { loginValidation, registerValidation } = require('../middlewares/authValidation');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 7;

const login = async (req, res) => {
    try {
        const { phone, password, keepAlive } = req.body;
        let passwordHash = null;

        const validation = loginValidation(req.body);

        if(validation){
            res.status(400).json(validation)
            return;
        } 

        pool.getConnection(function (err, connection) {
            connection.query("SELECT * FROM users WHERE phone='"
                + phone + "' LIMIT 1", async function (err, rows) {
                    
                    if (!err && rows.length > 0) {
                        passwordHash = rows[0].password;

                        const passwordVerified = await bcrypt.compare(password, passwordHash);
                    
                        if(passwordVerified){
                            // Entra aqui se tudo estiver certo
                            const user = {
                                "id": rows[0].id,
                                "phone": rows[0].phone,
                                "name": rows[0].name
                            };

                            let token = null;

                            if(keepAlive){
                                token = jsonwebtoken.sign(
                                    { user },
                                    jwtSecret,
                                );
                            }else{
                                token = jsonwebtoken.sign(
                                    { user },
                                    jwtSecret,
                                    { expiresIn: '60m'}
                                );
                            }

                            res.status(200).json({data: { user, token }});
                        }else{
                            // Senha incorreta
                            res.status(400).json({error: "Número de telefone ou senha incorreta."});
                        }

                    } else {
                        // usuário não existe no banco
                        res.status(400).json({error: "Número de telefone ou senha incorreta."});
                    }

            });
        });
    } catch (error) {
        res.status(400).json({error: "Ocorreu um erro ao realizar o login."})
    }
}

const register = async (req, res) => {
    try {
        const { name, phone, password } = req.body;
        let passwordHash = null;

        const validation = registerValidation(req.body);

        if(validation){
            res.status(400).json(validation)
            return;
        } 

        await bcrypt
        .hash(password, saltRounds)
        .then(hash => { 
            passwordHash = hash;
        })
        .catch(err => console.error(err.message))
    
        pool.getConnection(function (err, connection) {
    
            connection.query(`INSERT INTO users (name, phone, password) VALUES ('${name}', '${phone}', '${passwordHash}')`
            , function (err, rows) {

                if(!err){
                    if (rows.affectedRows) {

                        connection.query("SELECT * FROM users WHERE id='" + rows.insertId
                            + "' LIMIT 1", function (err, rows) {
                                if (!err && rows.length > 0) {

                                    const user = {
                                        "id": rows[0].id,
                                        "phone": rows[0].phone,
                                        "name": rows[0].name
                                    };
        
                                    const token = jsonwebtoken.sign(
                                        { user },
                                        jwtSecret,
                                        { expiresIn: '60m'}
                                    );

                                    res.status(201).json({data: { user, token }});
                                }else {
                                    res.status(400).json({error: "Ocorreu um erro ao realizar o registro do usuário."})
                                }
                        });
                    }
                }else{
                    if(err.sqlMessage.includes('users.phone') && err.errno === 1062){
                        res.status(400).json({error: "O número de telefone já está cadastrado."})
                    }else{
                        res.status(400).json({error: "Ocorreu um erro ao realizar o registro do usuário."})
                    }
                }
            });
        });
       
    } catch (error) {
        res.status(400).json({error: "Ocorreu um erro ao realizar o registro do usuário."})
    }
}

module.exports = {
    login,
    register
}