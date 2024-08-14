const Category = require('../models/Category');
const Product = require('../models/Product');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort("name").exec();

        res.status(200).json(categories)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar categorias." })
    }
}

const getCategory = async (req, res) => {
    const id = req.params.id;

    if(req.user.role !== 'ADMIN'){
        res.status(403).json({error: "Você não tem permissão."});
        return;
    }
    

    try {
        const category = await Category.findById(id);
        
        if(!category){
            res.status(404).json({ error: "Categoria não encontrada." })
        }

        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível recuperar a categoria." })
    }

}

const createCategory = async (req, res) => {
    const { name } = req.body;

    if(!name){
        return res.status(400).json({error: "É necessário preencher todos os campos."})
    }

    if(req.user.role !== 'ADMIN'){
        res.status(403).json({error: "Você não tem permissão."});
        return;
    }

    try {

        const categoryExists = await Category.findOne({ name });

        if(categoryExists) {
            return res.status(400).json({error: "Esta categoria já existe."});
        }

        const newCategory = await Category.create({
            name,
            userId: req.user._id,
        })

        if(!newCategory){
            return res.status(400).json({ error: "Não foi possível cadastrar a categoria." })
        }

        res.status(201).json(newCategory)
        
    } catch (error) {
        res.status(400).json({ error: "Não foi possível cadastrar a categoria." })
    }

}

const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if(!name){
        return res.status(400).json({error: "É necessário preencher todos os campos."})
    }

    if(req.user.role !== 'ADMIN'){
        res.status(403).json({error: "Você não tem permissão."});
        return;
    }

    try {
        const category = await Category.findById(id);

        if(category.userId.toString() !== req.user._id.toString() && req.user.role !== "ADMIN"){
            res.status(403).json({
                error: "Você não tem permissão para atualizar esta categoria."
            })
            return;
        }

        category.name = name;
        
        await category.save();

        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: "Não foi possível atualizar a categoria." })
    }

}

const deleteCategory = async (req, res) => {
    const id = req.params.id;

    if(req.user.role !== 'ADMIN'){
        res.status(403).json({error: "Você não tem permissão."});
        return;
    }

    try {

        const category = await Category.findById(id)
        const productsByCategory = await Product.find();

        if(category.userId.toString() !== req.user._id.toString() && req.user.role !== "ADMIN"){
            res.status(403).json({
                error: "Você não tem permissão para excluir esta categoria."
            })
            return;
        }

        if(productsByCategory){
            res.status(400).json({
                error: "Não é possível excluir esta categoria porque contém produtos."
            })
            return;
        }

        await Category.findByIdAndDelete(id);
        res.status(200).json({ success:"Categoria excluída com sucesso."})
    
    } catch (error) {
        res.status(400).json({ error: "Não foi possível excluir a categoria." })
    }
}


module.exports = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}