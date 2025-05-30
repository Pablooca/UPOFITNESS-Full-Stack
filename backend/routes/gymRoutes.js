const express = require('express');
const router = express.Router();
const {getGyms, getGymByCity, createGym, delGym, updateGym} = require('../controllers/gymController');
const { protect_worker } = require('../middleware/authMiddleware');

router.route('/').get(getGyms).post(protect_worker, createGym);
router.route('/:city').get(getGymByCity);
router.route('/:id').delete(protect_worker, delGym).put(protect_worker, updateGym);

module.exports = router;