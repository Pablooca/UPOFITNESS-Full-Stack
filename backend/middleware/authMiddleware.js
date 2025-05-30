const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const {getUserById} = require('../controllers/userController');
const {getWorkerById} = require('../controllers/workerController');

const protect_user = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            user = await getUserById(decoded.id)

            if (!user) {
                res.status(401)
                throw new Error('Not authorized, no user found')
            }
            if (user) {
                req.user = user
            }

            next()
            
        } catch (error){
            console.error(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const protect_worker = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const worker = await getWorkerById(decoded.id)

            if (!worker) {
                res.status(401)
                throw new Error('Not authorized, no worker found')
            }

            req.worker = worker;

            console.log('Worker found:', worker);

            next();
            
        } catch (error){
            console.error(error);
            res.status(401)
            throw new Error('Not authorized, invalid token en funcion protect_worker')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect_user, protect_worker };