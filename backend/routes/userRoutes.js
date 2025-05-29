const express = require('express')
const router = express.Router();
const {getUsers, getUserById, registerUser, loginUser} = require('../controllers/userController');
const {checkEmail, checkDNI, checkBirthDate} = require('../middleware/checksMiddleware');
const { protect_user, protect_worker } = require('../middleware/authMiddleware'); 

router.route('/').get(getUsers).post(registerUser);
router.route('/:dni').get(getUserById);
router.route('/login').post(loginUser);

module.exports = router;