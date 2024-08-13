const { pool } = require('../db');

const searchProducts = (req, res) => {

}

const getAllProducts = (req, res) => {

    const status = 1;

    try {
        pool.getConnection(function (err, connection) {
            connection.query("SELECT * FROM products WHERE status='" + status
                + "'", function (err, rows) {
                if (!err && rows.length > 0) {
                    const products = rows;
                    res.status(200).json({ products });
                }else {
                    res.status(400).json({error: "Ocorreu um erro ao resgatar produtos."})
                }
            });
        });

    } catch (error) {
        res.status(400).json({error: "Ocorreu um erro ao resgatar produtos."})
    }
}

const getProduct = (req, res) => {
    const id = req.params.id;
    res.status(200).json({id});
}

const createProduct = (req, res) => {
    const { title, 
        description,
        location, 
        status,
        contact, 
        whatsapp, 
        img,
    } = req.body;
    
    const user = req.user;

    try {
        pool.getConnection(function (err, connection) {
    
            connection.query(`INSERT INTO products (title, 
                description, 
                location,
                status,
                contact,
                whatsapp,
                img,
                user_id
            ) VALUES ('${title}', 
                '${description}', 
                '${location}',
                '${status}',
                '${contact}', 
                '${whatsapp}', 
                '${img}', 
                '${user.id}'
            )`
            , function (err, rows) {
    
                if(!err){
                    if (rows.affectedRows) {
                        connection.query("SELECT * FROM products WHERE id='" + rows.insertId
                            + "' LIMIT 1", function (err, rows) {
                                if (!err && rows.length > 0) {
                                    const product = rows[0];
                                    res.status(201).json({ product });
                                }else {
                                    res.status(400).json({error: "Ocorreu um erro ao cadastrar produto."})
                                }
                        });
                    }else{
                        res.status(400).json({error: "Ocorreu um erro ao cadastrar produto."})
                    }
                }else{
                    console.log(err)
                    res.status(400).json({error: "Ocorreu um erro ao cadastrar produto."})
                }
            });
        });
    } catch (error) {
        res.status(400).json({error: "Ocorreu um erro ao cadastrar produto."})
    }
}

const updateProduct = (req, res) => {

}

const deleteProduct = (req, res) => {

}


module.exports = {
    searchProducts,
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}