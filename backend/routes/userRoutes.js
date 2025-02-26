const express = require('express')
const router = express.Router();
const {getUsers, getUserById, registerUser, loginUser} = require('../controllers/userController');

const {checkEmail, checkDNI, checkBirthDate} = require('../middleware/checksMiddleware');

router.route('/').get(getUsers).post(checkEmail, checkDNI, registerUser);
router.route('/:dni').get(getUserById);
router.route('/login').post(loginUser);

module.exports = router;