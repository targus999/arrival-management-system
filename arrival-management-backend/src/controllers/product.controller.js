const ProductService = require('../services/product.service.js');

class ProductController {


    /**
     * Retrieves all products based on the provided ID.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The ID of the product to retrieve.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the products are retrieved and the response is sent.
     * @throws {Error} - If an error occurs while retrieving the products.
     */
    static async getProducts(req, res) {
        try {
            const product = await ProductService.getAllProducts(req.params.id);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }


    /**
     * Retrieves a product by its barcode.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The barcode of the product to retrieve.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {Error} - If an error occurs while retrieving the product.
     */
    static async getByBarcode(req, res) {
        try {
            const searchObj= {barcode:req.params.id};
            const product = await ProductService.getByBarcode(searchObj);
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }


    /**
     * Adds a product based on the presence of a barcode in the request body.
     * If a barcode is present, it calls the method to add a product with a barcode.
     * Otherwise, it calls the method to add a product without a barcode.
     *
     * @param {Object} req - The request object.
     * @param {Object} req.body - The body of the request.
     * @param {string} [req.body.barcode] - The barcode of the product (optional).
     * @param {Object} res - The response object.
     * @returns {Promise<void>}
     */
    static async addProduct(req, res) {
        if(req.body.barcode){ 
            ProductController.addProductWithBarcode(req, res);
        }else{
            ProductController.addProductWithoutBarcode(req, res);
        }
    }


    /**
     * Adds a product with a barcode. If the product with the given barcode and condition already exists for the specified arrival_id,
     * it updates the quantity of the existing product. Otherwise, it adds a new product.
     *
     * @param {Object} req - The request object.
     * @param {Object} req.body - The request body.
     * @param {string} req.body.barcode - The barcode of the product.
     * @param {string} req.body.condition - The condition of the product.
     * @param {string} req.body.arrival_id - The arrival ID of the product.
     * @param {number} req.body.quantity - The quantity of the product.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    static async addProductWithBarcode(req, res) {
        try {
            const{barcode,condition,arrival_id,quantity} = req.body;
            const barcodeArray = await ProductService.searchForProduct({barcode,condition});

            if(barcodeArray.length>0){
                const barcodeExists = barcodeArray.find(item => item.arrival_id === arrival_id) || null;
                if(barcodeExists){
                    barcodeExists.quantity= parseInt(barcodeExists.quantity) + parseInt(quantity);
                    const product = await ProductService.updateProduct(barcodeExists);
                    res.status(201).json(product); 
                }else{
                    req.body.sku = barcodeArray[0].sku;
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


    /**
     * Adds a product without a barcode to the inventory.
     * 
     * This function searches for an existing product based on the provided brand, category, color, size, style, and condition.
     * If a matching product is found and it has the same arrival_id, the quantity of the existing product is updated.
     * If no matching product with the same arrival_id is found, a new product is added with the same SKU as the found product.
     * If no matching product is found at all, a new product is added with a new SKU.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.body - The body of the request.
     * @param {string} req.body.brand - The brand of the product.
     * @param {string} req.body.category - The category of the product.
     * @param {string} req.body.color - The color of the product.
     * @param {string} req.body.size - The size of the product.
     * @param {string} req.body.style - The style of the product.
     * @param {string} req.body.condition - The condition of the product.
     * @param {string} req.body.arrival_id - The arrival ID of the product.
     * @param {number} req.body.quantity - The quantity of the product.
     * @param {Object} res - The response object.
     * 
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    static async addProductWithoutBarcode(req, res) {
        try {
            const searchObj= {brand:req.body.brand, category:req.body.category, color:req.body.color, size:req.body.size, style:req.body.style, condition:req.body.condition};
            const productArray = await ProductService.searchForProduct(searchObj);
            
            if(productArray.length>0){
                const productExists = productArray.find(item => item.arrival_id === req.body.arrival_id) || null;
                if(productExists){
                    productExists.quantity= parseInt(productExists.quantity) + parseInt(req.body.quantity);
                    const product = await ProductService.updateProduct(productExists);
                    res.status(201).json(product);
                }else{
                    req.body.sku = productArray[0].sku;
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