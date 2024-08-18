const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { imageUpload } = require('../middlewares/imageUpload');
const { createAndUpdateValidation } = require('../middlewares/productValidation');

router.get('/products', ProductController.getAllAvailableProducts);
router.get('/products/search', ProductController.searchProducts);
router.get('/products/all', ProductController.getAllProducts);
router.get('/products/category/:id', ProductController.getProductsByCategory);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', imageUpload.single("image"), createAndUpdateValidation, ProductController.createProduct);
router.patch('/products/:id/buy', ProductController.buyProduct)
router.put('/products/:id', createAndUpdateValidation, ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;