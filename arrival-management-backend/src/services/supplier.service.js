const { Supplier } = require('../models');

class SupplierService {

    static async getAllSuppliers() {
        return await Supplier.findAll();
    }
}
module.exports = SupplierService;