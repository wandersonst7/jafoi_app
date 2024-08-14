const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/products', ProductController.getAllAvailableProducts);
router.get('/products/all', ProductController.getAllProducts);
router.get('/products/category/:id', ProductController.getProductsByCategory);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', ProductController.createProduct);
router.patch('/products/:id/buy', ProductController.buyProduct)
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;