const { Product } = require('../models');

class ProductService {
    static async getAllProducts(id) {
        return await Product.findAll({
            where: { arrival_id:id }, // Filters products where barcode matches
        });
    }
    static async getByBarcode(barcode) {
        return await Product.findOne({
            where: { barcode }, // Filters products where barcode matches
        });
    }
    static async addProduct(data) {
        return await Product.findOne({
            where: { barcode }, // Filters products where barcode matches
        });
    }
}
module.exports = ProductService;