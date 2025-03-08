const ArrivalService = require('../services/arrival.service');

class ArrivalController {
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

    static async getFinishedArrivals(req, res) {
        try {
            const arrivals = await ArrivalService.getFinishedArrivals();
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all upcoming arrivals
    static async getUpcomingArrivals(req, res) {
        try {
            const arrivals = await ArrivalService.getUpcomingArrivals();
            res.json(arrivals);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get arrival by ID
    static async getArrivalById(req, res) {
        try {
            const arrival = await ArrivalService.getArrivalById(req.params.id);
            if (!arrival) return res.status(404).json({ error: 'Arrival not found' });

            res.json(arrival);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update arrival
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
