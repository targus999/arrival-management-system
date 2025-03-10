const express = require('express');
const SupplierController = require('../controllers/supplier.controller');
const router = express.Router();



router.get('/', SupplierController.getSuppliers);


module.exports = router;