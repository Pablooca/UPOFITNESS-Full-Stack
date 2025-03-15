const { encryptData, decryptData } = require('../middleware/encryptationMiddleware');
const jwt = require('jsonwebtoken');


const getWorkers = (req, res) => {
    connection.query('SELECT * FROM worker', (error, results) => {
        if (error) throw new Error('Error in getWorkers');
        res.status(200).json(results);
    })
}

const getWorkerById = (req, res) => {
    connection.query('SELECT * FROM worker WHERE dni = ?', [req.params.dni], (error, results) => {
        if (error) throw new Error('Error in getWorkerById');
        res.status(200).json(results);
    })
}

const registerWorker = (req, res) => {
    const {dni, name, birth_date, iban, email, user, password, id_gym} = req.body;

        if(!dni || !name || !birth_date || !iban || !email || !user || !password || !id_gym) {
            res.status(400)
            throw new Error('Please fill all fields');
        }
    
        // Check if user exists
        const workerExists = connection.query('SELECT * FROM worker WHERE user = ?', [user], (error, results) => {
            if (error) throw new Error('Error in workerExists');
            if (results.length > 0) {
                res.status(400);
                throw new Error('Worker already exists');
            }
        });

        const encryptedPassword = encryptData(password);

        const encryptedIban = encryptData(iban);

        connection.query('INSERT INTO worker (dni, name, birth_date, iban, email, user, password, id_gym) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [dni, name, birth_date, encryptedIban, email, user, encryptedPassword, id_gym], (error, results) => {
            if (error) throw new Error('Error in registerWorker');
            const token = generateToken(dni);
            res.status(201).json({results, token});
        })
}


const loginWorker = (req, res) => {
    const {user, password} = req.body;
    connection.query('SELECT dni, user, password FROM worker WHERE user = ?', [user], (error, results) => {
        if (error) throw new Error('Error in loginWorker');
        if (decryptData(results[0].password) === password){
            const token = generateToken(results[0].dni);
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(400).json('Invalid credentials')
        }
    })
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getWorkers,
    getWorkerById,
    registerWorker,
    loginWorker,
}