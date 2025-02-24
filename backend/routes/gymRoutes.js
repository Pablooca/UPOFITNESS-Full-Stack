const express = require('express');
const router = express.Router();
const {getGyms, getGymByCity, createGym, delGym, updateGym} = require('../controllers/gymController');

router.route('/').get(getGyms).post(createGym);
router.route('/:city').get(getGymByCity);
router.route('/:id').delete(delGym).put(updateGym);

module.exports = router;