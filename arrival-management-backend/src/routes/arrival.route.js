const express = require('express');
const ArrivalController = require('../controllers/arrival.controller');
const router = express.Router();


router.post('/add', ArrivalController.addArrival);
router.get('/upcoming', ArrivalController.getUpcomingArrivals);
router.get('/all', ArrivalController.getAllArrivals);
router.get('/finished', ArrivalController.getFinishedArrivals);
router.get('/get/:id', ArrivalController.getArrivalById);
router.put('/update/:id', ArrivalController.updateArrival);

module.exports = router;
