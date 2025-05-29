const { encryptData, decryptData } = require('../middleware/encryptationMiddleware');
const jwt = require('jsonwebtoken');
const { getPool } = require('../config/db');

const pool = getPool();

const getUsers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error in getUsers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUserById = (req, res) => {
    const dni = req.params.dni;
    console.log('Fetching user by ID:', dni);

    pool.query('SELECT * FROM users WHERE dni = $1', [dni], (error, result) => {
        if (error) {
            console.error('Error in getUserById:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    });
};


const registerUser = async (req, res) => {
    const {dni, name, birth_date, direction, iban, phone_number, email, user, password} = req.body;
    console.log('Registering user:', req.body);
    if(!dni || !name || !birth_date || !direction || !iban || !phone_number || !email || !user || !password) {
        res.status(400).json({ error: 'Please fill all fields' });
        return;
    }
    try {
        const encryptedPassword = encryptData(password);
        const encryptedIban = encryptData(iban);

        const result = await pool.query('INSERT INTO users (dni, name, birth_date, direction, iban, phone_number, email, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [dni, name, birth_date, direction, encryptedIban, phone_number, email, user, encryptedPassword]);

        const token = generateToken(dni);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ error: 'Please provide both user and password' });
    }

    console.log('Username: ', user);
    console.log('Password: ', password);

    try {
        const results = await pool.query('SELECT dni, username, password FROM users WHERE username = $1', [user]);
        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const decryptedPassword = decryptData(results.rows[0].password);
        if (decryptedPassword !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(results.rows[0].dni);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
}