const express = require('express');
const { Arrival, Supplier } = require('../models/index');
const ArrivalController = require('../controllers/arrival.controller');
const router = express.Router();


router.post('/add', ArrivalController.addArrival);
router.get('/get-upcoming', ArrivalController.getUpcomingArrivals);
router.get('/get-all', ArrivalController.getAllArrivals);
router.get('/get-finished', ArrivalController.getFinishedArrivals);
router.get('/get/:id', ArrivalController.getArrivalById);
router.put('/update/:id', ArrivalController.updateArrival);

module.exports = router;
