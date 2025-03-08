const { Supplier, Arrival } = require('../models');

class ArrivalService {

    // Create a new arrival
    static async addArrival(data) {
        const { supplier_id, expected_arrival_date, title, total_pallets, total_boxes, total_pieces, total_weight } = data;

        //  Check if supplier exists
        let supplier = await Supplier.findByPk(supplier_id);

        //  If supplier does not exist, create a new one
        if (!supplier) {
            supplier = await Supplier.create({
                id: supplier_id, 
                name: `Supplier-${supplier_id}`,
                contact_info: 'Not provided'
            });
            console.log(`Created new supplier with ID: ${supplier.id}`);
        }

        //  Generate Arrival Number (Example: ARR-001)
        const lastArrival = await Arrival.findOne({ order: [['id', 'DESC']] });
        const arrivalNumber = `ARR-${String((lastArrival?.id || 0) + 1).padStart(3, '0')}`;

        //  Create new arrival record
        const newArrival = await Arrival.create({
            arrival_number: arrivalNumber,
            supplier_id: supplier.id,
            expected_arrival_date,
            title,
            total_pallets,
            total_boxes,
            total_pieces,
            total_weight
        });

        return newArrival;
    }
    static async getUpcomingArrivals() {
        return await Arrival.findAll({
            where: { status: 'upcoming' },
            include: [{ model: Supplier, attributes: ['name'] }],
            order: [['expected_arrival_date', 'ASC']]
        });
    }

    static async getFinishedArrivals() {
        return await Arrival.findAll({
            where: { status: 'finished' },
            include: [{ model: Supplier, attributes: ['name'] }],
            order: [['expected_arrival_date', 'ASC']]
        });
    }

    // Fetch a single arrival by ID
    static async getArrivalById(id) {
        return await Arrival.findByPk(id, {
            include: [{ model: Supplier, attributes: ['name'] }]
        });
    }

    // Update an arrival by ID
    static async updateArrival(id, data) {
        console.log('updated Arrival: ', id);
        const arrival = await Arrival.findByPk(id);
        if (!arrival) return null;

        await arrival.update(data);
        return arrival;
    }
}

module.exports = ArrivalService;
