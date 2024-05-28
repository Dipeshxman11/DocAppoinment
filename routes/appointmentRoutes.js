const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.get('/users', appointmentController.getUsers);  
router.get('/search', appointmentController.searchAppointments);

module.exports = router;