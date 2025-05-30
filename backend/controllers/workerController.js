const { encryptData, decryptData } = require('../middleware/encryptationMiddleware');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

const pool = getPool();

const getWorkers = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM worker');
        res.status(200).json(results.rows);
    } catch (error){
        console.error('Error in getWorkers:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
}

const getWorkerById = async (dni) => {
    console.log('Fetching worker by ID:', dni);
    const result = await pool.query('SELECT * FROM worker WHERE dni = $1', [dni]);
    if (result.rows.length > 0){
        return result.rows[0];
    } else {
        return null;
    }
}

// const getWorkerById = async (req, res) => {
//     console.log(req.worker);
//     const dni = req.worker.dni;
//     console.log('Fetching worker by ID:', dni);

//     pool.query('SELECT * FROM worker WHERE dni = $1', [dni], (error, result) => {
//         if (error){
//             console.error('Error in getWorkerById:', error);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: 'Worker not found' });
//         }

//         res.status(200).json(result.rows[0]);
//     })

// }

const registerWorker = async (req, res) => {
    const {dni, name, birth_date, iban, email, user, password, id_gym} = req.body;

    if(!dni || !name || !birth_date || !iban || !email || !user || !password || !id_gym) {
        res.status(400).json({ error: 'Please fill all fields' });
        return;
    }

    try {
        const encryptedPassword = encryptData(password);
        const encryptedIban = encryptData(iban);

        const result = await pool.query('INSERT INTO worker (dni, name, birth_date, iban, email, username, password, id_gym) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
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
        const results = await pool.query('SELECT dni, username, password FROM worker WHERE username = $1', [user]);
        if (results.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const worker = results.rows[0];
        if (decryptData(worker.password) === password) {
            const token = generateToken(worker.dni);
            res.status(200).json({ id: worker.dni, user: worker.username, token: token });
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