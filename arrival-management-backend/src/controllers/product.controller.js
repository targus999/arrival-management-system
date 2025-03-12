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
            const product = await ProductService.getByBarcode(req.params.id);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    static async addProduct(req, res) {
        try {
            const product = await ProductService.addProduct(req.body);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = ProductController;