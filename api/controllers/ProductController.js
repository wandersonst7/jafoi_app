const Product = require('../models/Product');
const Category = require('../models/Category');

const searchProducts = (req, res) => {

}

const buyProduct = async (req, res) => {

    const id = req.params.id;

    try {
        const product = await Product.findById(id);

        if(product.userId.toString() !== req.user._id.toString()){
            res.status(403).json({
                error: "Você não tem permissão para mudar o status do produto."
            })
            return;
        }

        product.status = 0,
        await product.save();

        res.status(200).json({ success:"Status do produto alterado."})
    } catch (error) {
        res.status(400).json({ error: "Não foi possível mudar o status do produto." })
    }
}

const getProductsByCategory = async (req, res) => {

    const category = req.params.id;

    try {

        const products = await Product.find({ status: 1, categoryId: category}).sort({createdAt : -1}).exec();

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar produtos." })
    }
}

const getAllProducts = async (req, res) => {
    try {
        let products = [];

        if(req.user.role === 'ADMIN'){
            products = await Product.find().sort({createdAt : -1}).exec();
        }else{
            products = await Product.find({ userId: req.user._id }).sort({createdAt : -1}).exec();
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar produtos." })
    }
}

const getAllAvailableProducts = async (req, res) => {
    try {

        const products = await Product.find({ status: 1}).sort({createdAt : -1}).exec();

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar produtos." })
    }
}


const getProduct = async (req, res) => {

    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        
        if(!product){
            res.status(404).json({ error: "Produto não encontrado." })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar o produto." })
    }

}

const createProduct = async (req, res) => {
    const { title,
        price, 
        description,
        location, 
        status,
        contact, 
        whatsapp, 
        img,
        username,
        categoryId
    } = req.body;

    try {

        const category = await Category.findById(categoryId.toString());

        if(!category){
            return res.status(404).json({ error: "Esta categoria não existe." })
        }

        const newProduct = await Product.create({
            title,
            price, 
            description,
            location, 
            status,
            contact, 
            whatsapp, 
            img,
            username,
            categoryId,
            userId: req.user._id,
        })

        if(!newProduct){
            return res.status(400).json({ error: "Não foi possível cadastrar o produto." })
        }

        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Não foi possível cadastrar o produto." })
    }

}

const updateProduct = async (req, res) => {

    const id = req.params.id;

    const { title,
        price, 
        description,
        location, 
        status,
        contact, 
        whatsapp, 
        img,
        username,
        categoryId,
    } = req.body;


    try {
        const product = await Product.findById(id);

        const category = await Category.findById(categoryId);

        if(!category){
            return res.status(404).json({ error: "Esta categoria não existe." })
        }

        if(product.userId.toString() !== req.user._id.toString() && req.user.role !== "ADMIN"){
            res.status(403).json({
                error: "Você não tem permissão para atualizar este produto."
            })
            return;
        }

        product.title = title,
        product.price = price, 
        product.description = description,
        product.location = location, 
        product.status = status,
        product.contact = contact, 
        product.whatsapp = whatsapp, 
        product.img = img,
        product.username = username,
        product.userId = req.user._id,
        product.categoryId = categoryId
    
        await product.save();

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível atualizar o produto." })
    }

}

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {

        const product = await Product.findById(id)

        if(product.userId.toString() !== req.user._id.toString() && req.user.role !== "ADMIN"){
            res.status(403).json({
                error: "Você não tem permissão para excluir este produto."
            })
            return;
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ success:"Produto excluído com sucesso."})
    
    } catch (error) {
        res.status(400).json({ error: "Não foi possível excluir o produto." })
    }
}


module.exports = {
    searchProducts,
    getAllProducts,
    getAllAvailableProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    buyProduct
}