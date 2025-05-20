const express = require('express');
const router = express.Router();
const {getAppointments, getAppointmentByUser, getAppointmentByWorker, getAppointmentByDate, createAppointment, delAppointment, updateAppointment} = require('../controllers/appointmentController');
const { protect_user, protect_worker } = require('../middleware/authMiddleware');


router.route('/user').get(protect_user, getAppointmentByUser);
router.route('/worker').get(protect_worker, getAppointmentByWorker);
router.route('/date/:date').get(protect_worker, getAppointmentByDate);
router.route('/').get(protect_worker, getAppointments).post(protect_worker, createAppointment);
router.route('/:id').delete(protect_worker, delAppointment).put(protect_worker, updateAppointment);

module.exports = router;