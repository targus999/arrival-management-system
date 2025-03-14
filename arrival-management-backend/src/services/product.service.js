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



    /**
     * Retrieves all products associated with a specific arrival ID.
     * @param {number} id - The arrival ID to filter products by.
     * @returns {Promise<Array>} - An array of products that match the arrival ID.
     */
    static async getAllProducts(id) {
        return await Product.findAll({
            where: { arrival_id: id }, // Filters products where arrival_id matches
        });
    }


    /**
     * Retrieves a product by its barcode.
     * @param {Object} filters - The filters to apply when searching for the product.
     * @param {string} filters.barcode - The barcode of the product to find.
     * @returns {Promise<Object|null>} A promise that resolves to the product if found, or null if not found.
     */
    static async getByBarcode(filters) {
        return await Product.findOne({
            where: filters, // Filters products 
        });
    }


    /**
     * Searches for products based on the provided filters.
     *
     * @param {Object} filters - The filters to apply when searching for products.
     * @returns {Array}  An array of products that match the filters.
     */
    static async searchForProduct(filters) {
        return await Product.findAll({
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