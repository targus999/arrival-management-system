const express = require('express');
const ProductController = require('../controllers/product.controller.js');
const router = express.Router();



router.get('/all/:id', ProductController.getProducts);
router.get('/barcode/:id', ProductController.getByBarcode);
router.post('/add', ProductController.addProduct);


module.exports = router;