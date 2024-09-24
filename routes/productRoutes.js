const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware'); 

productRouter.post('/', verifyToken, productController.createProduct);
productRouter.get('/', verifyToken, productController.getAllProducts);
productRouter.get('/:id', verifyToken, productController.getProductById);
productRouter.put('/:id', verifyToken, productController.updateProduct);
productRouter.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = productRouter;