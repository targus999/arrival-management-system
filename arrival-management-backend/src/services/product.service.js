const { Product } = require('../models');

class ProductService {
     /**
     * Adds a new product to the database.
     * @param {Object} productData - Product details to add.
     * @returns {Promise<Object>} - The created product.
     */
     static async addProduct(productData) {
        try {
            const newProduct = await Product.create(productData);
            console.log('New Product Added');
            return newProduct;
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }


    /**
     * Updates an existing product in the database.
     * @param {Object} product - The product object to update.
     * @returns {Promise<Object>} - The updated product.
     */
    static async updateProduct(product) {
        try {
            await product.save(); // Saves the updated fields
            console.log('Product Updated');
            
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }



    static async getAllProducts(id) {
        return await Product.findAll({
            where: { arrival_id:id }, // Filters products where arrival_id matches
        });
    }
    static async searchForProduct(filters) {
        return await Product.findOne({
            where: filters, // Filters products 
        });
    }
   

    /**
     * Generates a new SKU and adds a new product.
     * @param {Object} productData - Product details to add.
     * @returns {Promise<Object>} - The newly created product.
     */
    static async addProductWithNewSKU(productData) {
        try {
            delete productData.id;// Deletes the id field
            const newSKU = `${productData.brand||'NA'}-${productData.name||'NA'}-${productData.category}-${productData.color||'NA'}-${productData.size||'NA'}-${productData.style||'NA'}`.replace(/\s/g, '-').toUpperCase();
            productData.sku = newSKU;
            return await ProductService.addProduct(productData);
        } catch (error) {
            throw new Error(`Error adding product with new SKU: ${error.message}`);
        }
    }

}
module.exports = ProductService;