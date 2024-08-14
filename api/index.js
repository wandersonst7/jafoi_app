// Importação
const cors = require('cors');
const express = require('express');
const conn = require('./db')
const { tokenValidate } = require('./middlewares/auth');

// Rotas
const AuthRoutes = require('./routes/AuthRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const CategoryRoutes = require('./routes/CategoryRoutes');

// Configuração
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json())

// Conectando bd
conn();

// Liberando Cors
app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
}));


// Main
app.use(AuthRoutes)

// Protegendo rotas com token
app.use('*', tokenValidate)

// Rota de produtos
app.use(ProductRoutes)

// Rota de categorias
app.use(CategoryRoutes)

// rota privada teste
app.get('/private', (req, res) => {
    const user = req.user;
    return res.status(200).json({
        message: "OK",
        data: {
            userLogged: user
        }
    })
})

// Listen
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
});