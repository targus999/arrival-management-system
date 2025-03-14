const { Op } = require('sequelize');
const { Supplier, Arrival } = require('../models');

class ArrivalService {

    
    /**
     * Adds a new arrival record to the system.
     * @param {Object} data - The arrival data.
     * @param {number} data.supplier_id - The ID of the supplier.
     * @param {string} data.expected_arrival_date - The expected arrival date.
     * @param {string} data.title - The title of the arrival.
     * @param {string|number} data.total_pallets - The total number of pallets.
     * @param {string|number} data.total_boxes - The total number of boxes.
     * @param {string|number} data.total_pieces - The total number of pieces.
     * @param {string|number} data.total_weight - The total weight.
     * 
     * @returns {Object} The newly created arrival record.
     * 
     * @throws {Error} If there is an error during the creation of the arrival record.
     */
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
            total_pallets:total_pallets==''?null:parseInt(total_pallets),
            total_boxes:total_boxes==''?null:parseInt(total_boxes),
            total_pieces:total_pieces==''?null:parseInt(total_pieces),
            total_weight:total_weight==''?null:parseFloat(total_weight),
        });

        return newArrival;
    }

    /**
     * Starts the processing of an arrival by updating its status and received quantities.
     *
     * @param {number} id - The ID of the arrival to be processed.
     * @param {Object} data - The data containing the quantities received.
     * @param {number} data.pallets - The number of pallets received.
     * @param {number} data.boxes - The number of boxes received.
     * @returns {Promise<Object>} The updated arrival object.
     * @throws {Error} If the arrival is not found.
     */
    static async startProcessing(id,data) {    
        const{pallets, boxes} = data;
        console.log('Processing started: ', id);
        const arrival = await Arrival.findByPk(id);
        if (!arrival) {
            return res.status(404).json({ message: 'Arrival not found' });
        }

        await arrival.update({actual_received_pallets:parseInt(pallets), actual_received_boxes:parseInt(boxes), status: 'processing'});
        return arrival;
    }


    /**
     * Marks the processing of an arrival as finished.
     * 
     * @param {number} id - The ID of the arrival to finish processing.
     * @returns {Promise<Object>} The updated arrival object.
     * @throws {Error} If the arrival is not found.
     */
    static async finishProcessing(id) {    
        console.log('Processing finished: ', id);
        const arrival = await Arrival.findByPk(id);
        if (!arrival) {
            return res.status(404).json({ message: 'Arrival not found' });
        }

        await arrival.update({ 
            status: 'finished',
            finished_at: new Date()
        });
        return arrival;
    }

    /**
     * Retrieves all arrivals from the database, including the associated supplier's name,
     * and orders them by the expected arrival date in ascending order.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of arrival objects.
     */
    static async getAllArrivals() {
        return await Arrival.findAll({
            include: [{ model: Supplier, attributes: ['name'] }],
            order: [['expected_arrival_date', 'ASC']]
        });
    }

    
    /**
     * Retrieves a list of upcoming arrivals.
     * 
     * This method fetches all arrivals with a status of 'upcoming' or 'processing',
     * includes the associated supplier's name, and orders the results by the expected
     * arrival date in ascending order.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of arrival objects.
     */
    static async getUpcomingArrivals() {
        return await Arrival.findAll({
            where: { status: { [Op.or]: ['upcoming', 'processing'] } },
            include: [{ model: Supplier, attributes: ['name'] }],
            order: [['expected_arrival_date', 'ASC']]
        });
    }



    /**
     * Retrieves all arrivals with a status of 'finished'.
     * The results include the associated supplier's name and are ordered by the expected arrival date in ascending order.
     *
     * @returns {Promise<Array>} A promise that resolves to an array of finished arrivals.
     */
    static async getFinishedArrivals() {
        return await Arrival.findAll({
            where: { status: 'finished' },
            include: [{ model: Supplier, attributes: ['name'] }],
            order: [['expected_arrival_date', 'ASC']]
        });
    }

   
    /**
     * Retrieves an arrival record by its ID.
     *
     * @param {number} id - The ID of the arrival record to retrieve.
     * @returns {Promise<Object|null>} A promise that resolves to the arrival record, including the supplier's name, or null if not found.
     */
    static async getArrivalById(id) {
        return await Arrival.findByPk(id, {
            include: [{ model: Supplier, attributes: ['name'] }]
        });
    }

    


    /**
     * Updates an arrival record with the given data.
     *
     * @param {number} id - The ID of the arrival record to update.
     * @param {Object} data - The data to update the arrival record with.
     * @param {string|number} data.total_pallets - The total number of pallets (can be an empty string or a number).
     * @param {string|number} data.total_boxes - The total number of boxes (can be an empty string or a number).
     * @param {string|number} data.total_pieces - The total number of pieces (can be an empty string or a number).
     * @param {string|number} data.total_weight - The total weight (can be an empty string or a number).
     * @returns {Promise<Object|null>} The updated arrival record, or null if the arrival record was not found.
     */
    static async updateArrival(id, data) {
        const {  total_pallets, total_boxes, total_pieces, total_weight } = data;
        console.log('updated Arrival: ', id);
        const arrival = await Arrival.findByPk(id);
        if (!arrival) return null;

        await arrival.update({...data,
            total_pallets:total_pallets==''?null:parseInt(total_pallets),
            total_boxes:total_boxes==''?null:parseInt(total_boxes),
            total_pieces:total_pieces==''?null:parseInt(total_pieces),
            total_weight:total_weight==''?null:parseFloat(total_weight),
        });
        return arrival;
    }
}

module.exports = ArrivalService;
