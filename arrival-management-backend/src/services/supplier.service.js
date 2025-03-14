const { Supplier } = require('../models');

class SupplierService {

    /**
     * Retrieves all suppliers from the database.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of supplier objects.
     */
    static async getAllSuppliers() {
        return await Supplier.findAll();
    }
}
module.exports = SupplierService;