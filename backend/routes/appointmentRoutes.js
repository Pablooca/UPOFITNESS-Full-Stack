const express = require('express');
const router = express.Router();
const {getAppointments, getAppointmentByUser, getAppointmentByWorker, getAppointmentByDate, createAppointment, delAppointment, updateAppointment} = require('../controllers/appointmentController');
const { protect_user, protect_worker } = require('../middleware/authMiddleware');


router.route('/user/:user_id').get(getAppointmentByUser);
router.route('/worker').get(protect_worker, getAppointmentByWorker);
router.route('/date/:date').get(getAppointmentByDate);
router.route('/').get(getAppointments).post(createAppointment);
router.route('/:id').delete(delAppointment).put(updateAppointment);

module.exports = router;