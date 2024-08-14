const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategory);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

module.exports = router;