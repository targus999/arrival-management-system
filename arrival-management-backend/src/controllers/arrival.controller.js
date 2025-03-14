const ArrivalService = require('../services/arrival.service');

class ArrivalController {
    /**
     * Adds a new arrival.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.body - The body of the request containing arrival data.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the arrival is added.
     * @throws {Error} - If there is an error while adding the arrival.
     */
    static async addArrival(req, res) {
        try {
            
            const newArrival = await ArrivalService.addArrival(req.body);
            console.log(`Created new arrival with ID: ${newArrival.id}`);
            res.status(201).json(newArrival);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    } 

    /**
     * Retrieves the list of finished arrivals.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {Error} - If there is an error while fetching the finished arrivals.
     */
    static async getFinishedArrivals(req, res) {
        try {
            const arrivals = await ArrivalService.getFinishedArrivals();
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



    /**
     * Handles the start of the arrival processing.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The ID of the arrival to start processing.
     * @param {Object} req.body - The request body.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - An Arrival will status processing.
     * @throws {Error} - If an error occurs during processing, a 500 status code and error message are returned.
     */
    static async processStarted(req, res) {
        try {
            const arrivals = await ArrivalService.startProcessing(req.params.id,req.body);
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Processes the finished arrivals.
     * 
     * This function handles the completion of arrival processing.
     * It retrieves the arrival data by calling the ArrivalService's finishProcessing method with the provided arrival ID.
     * If successful, it returns the arrival data as a JSON response.
     * In case of an error, it responds with a 500 status code and the error message.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The ID of the arrival to be processed.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the processing is complete.
     */
    static async processFinished(req, res) {
        try {
            const arrivals = await ArrivalService.finishProcessing(req.params.id);
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



    /**
     * Retrieves all arrivals.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {Error} - If an error occurs while retrieving arrivals.
     */
    static async getAllArrivals(req, res) {
        try {
            const arrivals = await ArrivalService.getAllArrivals();
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    
    /**
     * Retrieves the upcoming arrivals.
     * 
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the response is sent.
     * @throws {Error} - If there is an error retrieving the arrivals.
     */
    static async getUpcomingArrivals(req, res) {
        try {
            const arrivals = await ArrivalService.getUpcomingArrivals();
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    

    /**
     * Retrieves an arrival by its ID.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The ID of the arrival to retrieve.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     * @throws {Error} - If an error occurs while retrieving the arrival.
     */
    static async getArrivalById(req, res) {
        try {
            const arrival = await ArrivalService.getArrivalById(req.params.id);
            if (!arrival) return res.status(404).json({ error: 'Arrival not found' });

            res.json(arrival);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    

    /**
     * Updates an arrival record.
     * 
     * @param {Object} req - The request object.
     * @param {Object} req.params - The request parameters.
     * @param {string} req.params.id - The ID of the arrival to update.
     * @param {Object} req.body - The request body containing the update data.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     * @throws {Error} - If an error occurs during the update process.
     */
    static async updateArrival(req, res) {
        try {
            const updatedArrival = await ArrivalService.updateArrival(req.params.id, req.body);
            if (!updatedArrival) return res.status(404).json({ error: 'Arrival not found' });

            res.json(updatedArrival);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ArrivalController;
