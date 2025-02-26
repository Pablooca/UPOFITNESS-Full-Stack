const express = require('express')
const router = express.Router();
const {getWorkers, getWorkerById, registerWorker, loginWorker,} = require('../controllers/workerController');

const {checkEmail, checkDNI, checkBirthDate} = require('../middleware/checksMiddleware');

router.route('/').get(getWorkers).post(registerWorker);
router.route('/:dni').get(getWorkerById);
router.route('/login').post(loginWorker );

module.exports = router;