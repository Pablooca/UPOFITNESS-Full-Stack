const express = require('express');
const router = express.Router();
const { getDiets, getDietByUserId, getDietByWorkerId, createDiet } = require('../controllers/dietController');
const { protect_user, protect_worker } = require('../middleware/authMiddleware');

router.route('/').get(getDiets).post(createDiet);
router.route('/user/:id').get(getDietByUserId);
router.route('/worker').get(getDietByWorkerId);

module.exports = router;