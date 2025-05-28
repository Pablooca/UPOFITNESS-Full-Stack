const { encryptData, decryptData } = require('../middleware/encryptationMiddleware');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

const pool = getPool();

const getWorkers = async (req, res) => {
    try{
        const [results] = await pool.query('SELECT * FROM worker');
        res.status(200).json(results);
    } catch (error){
        console.error('Error in getWorkers:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
}

const getWorkerById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM worker WHERE dni = ?';
        pool.query(sql, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.length ? results[0] : null);
        });
    });
}

const registerWorker = async (req, res) => {
    const {dni, name, birth_date, iban, email, user, password, id_gym} = req.body;

    if(!dni || !name || !birth_date || !iban || !email || !user || !password || !id_gym) {
        res.status(400).json({ error: 'Please fill all fields' });
        return;
    }

    try {
        // Check if worker exists
        const [existingWorker] = await pool.query('SELECT * FROM worker WHERE user = ?', [user]);
        if (existingWorker.length > 0) {
            res.status(400).json({ error: 'Worker already exists' });
            return;
        }

        const encryptedPassword = encryptData(password);
        const encryptedIban = encryptData(iban);

        const [result] = await pool.query('INSERT INTO worker (dni, name, birth_date, iban, email, user, password, id_gym) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [dni, name, birth_date, encryptedIban, email, user, encryptedPassword, id_gym]);

        const token = generateToken(dni);
        res.status(201).json({ message: 'Worker registered successfully', token });
    } catch (error) {
        console.error('Error in registerWorker:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const loginWorker = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ error: 'Please provide both user and password' });
    }

    try {
        const [results] = await pool.query('SELECT dni, user, password FROM worker WHERE user = ?', [user]);
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const worker = results[0];
        if (decryptData(worker.password) === password) {
            const token = generateToken(worker.dni);
            res.status(200).json({ id: worker.dni, user: worker.user, token: token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error in loginWorker:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
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