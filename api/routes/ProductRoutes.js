const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/product', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProduct);
router.post('/product', ProductController.createProduct);

module.exports = router;