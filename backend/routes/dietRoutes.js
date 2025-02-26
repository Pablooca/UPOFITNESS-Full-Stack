const express = require('express');
const router = express.Router();
const { getDiets, getDietById, createDiet } = require('../controllers/dietController');

router.route('/').get(getDiets).post(createDiet);
router.route('/:id').get(getDietById);

module.exports = router;