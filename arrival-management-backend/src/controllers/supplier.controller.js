const SupplierService = require('../services/supplier.service');

class SupplierController {
    /**
     * Retrieves all suppliers and sends them as a JSON response.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the suppliers are retrieved and the response is sent.
     * @throws {Error} - If there is an error retrieving the suppliers, a 400 status code and error message are sent in the response.
     */
    static async getSuppliers(req, res) {
        try {
            const supplier = await SupplierService.getAllSuppliers();
            res.json(supplier);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = SupplierController;