const ProductService = require('../services/product.service.js');

class ProductController {
    static async getProducts(req, res) {
        try {
            const product = await ProductService.getAllProducts(req.params.id);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static async getByBarcode(req, res) {
        try {
            const searchObj= {barcode:req.params.id};
            const product = await ProductService.searchForProduct(searchObj);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static async addProduct(req, res) {
        if(req.body.barcode){
            ProductController.addProductWithBarcode(req, res);
        }else{
            ProductController.addProductWithoutBarcode(req, res);
        }
    }
    static async addProductWithBarcode(req, res) {
        try {
            const{barcode,condition,arrival_id,quantity} = req.body;
            const barcodeExists = await ProductService.searchForProduct({barcode,condition});
            if(barcodeExists){
                if(barcodeExists.arrival_id === arrival_id){
                    barcodeExists.quantity= parseInt(barcodeExists.quantity) + parseInt(quantity);
                    const product = await ProductService.updateProduct(barcodeExists);
                    res.status(201).json(product);
                }else{
                    req.body.sku = barcodeExists.SKU;
                    const product = await ProductService.addProduct(req.body);
                    res.status(201).json(product);
                }
            }
            else{
                const product = await ProductService.addProductWithNewSKU(req.body);
                res.status(201).json(product);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static async addProductWithoutBarcode(req, res) {
        try {
            const searchObj= {brand:req.body.brand, category:req.body.category, color:req.body.color, size:req.body.size, style:req.body.style, condition:req.body.condition};
            const productExists = await ProductService.searchForProduct(searchObj);
            if(productExists){
                if(productExists.arrival_id === arrival_id){
                    productExists.quantity= parseInt(productExists.quantity) + parseInt(quantity);
                    const product = await ProductService.updateProduct(productExists);
                    res.status(201).json(product);
                }else{
                    req.body.sku = productExists.SKU;
                    const product = await ProductService.addProduct(req.body);
                    res.status(201).json(product);
                }
            }
            else{
                const product = await ProductService.addProductWithNewSKU(req.body);
                res.status(201).json(product);
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = ProductController;