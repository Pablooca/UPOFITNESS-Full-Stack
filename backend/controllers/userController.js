const { encryptData, decryptData } = require('../middleware/encryptationMiddleware');
const jwt = require('jsonwebtoken');

const getUsers = (req, res) => {
    connection.query('SELECT * FROM user', (error, results) => {
        if (error) throw new Error('Error in getUsers');
        res.status(200).json(results);
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM user WHERE dni = ?';
        connection.query(sql, [id], (error, results) => {
            if (error) return reject(error);
            resolve(results.length ? results[0] : null);
        })
    })
}

const registerUser = (req, res) => {
    const {dni, name, birth_date, direction, iban, phone_number, email, user, password} = req.body;

    if(!dni || !name || !birth_date || !direction || !iban || !phone_number || !email || !user || !password) {
        res.status(400)
        throw new Error('Please fill all fields');
    }

    // Check if user exists
    const userExists = connection.query('SELECT * FROM user WHERE user = ?', [user], (error, results) => {
        if (error) throw new Error('Error in register');
        if (results.length > 0) {
            res.status(400);
            throw new Error('User already exists');
        }
    })

    const encryptedPassword = encryptData(password);

    const encryptedIban = encryptData(iban);

    connection.query('INSERT INTO user (dni, name, birth_date, direction, iban, phone_number, email, user, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [dni, name, birth_date, direction, encryptedIban, phone_number, email, user, encryptedPassword], (error, results) => {
        if (error) throw new Error('Error in register');
        const token = generateToken(dni);
        res.status(201).json({ results, token });
    })
}

const loginUser = (req, res) => {
    const {user, password} = req.body;
    connection.query('SELECT dni, user, password FROM user WHERE user = ?', [user], (error, results) => {
        if (error) throw new Error('Error in loginUser');
        const decryptedPassword = decryptData(results[0].password);
        if (decryptedPassword === password){
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
    getUsers,
    getUserById,
    registerUser,
    loginUser,
}