const express = require('express');
const router = express.Router();
const { getDiets, getDietByUserId, getDietByWorkerId, createDiet } = require('../controllers/dietController');
const { protect_user, protect_worker } = require('../middleware/authMiddleware');

router.route('/').get(protect_worker, getDiets).post(protect_worker, createDiet);
router.route('/user').get(protect_user, getDietByUserId);
router.route('/worker').get(protect_worker, getDietByWorkerId);

module.exports = router;