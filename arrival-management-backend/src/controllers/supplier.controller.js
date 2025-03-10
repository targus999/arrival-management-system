const SupplierService = require('../services/supplier.service');

class SupplierController {
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