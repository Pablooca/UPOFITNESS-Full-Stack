const getUsers = (req, res) => {
    connection.query('SELECT * FROM worker', (error, results) => {
        if (error) throw new Error('Error in getUsers');
        res.status(200).json(results);
    })
}

const getUserById = (req, res) => {
    connection.query('SELECT * FROM worker WHERE dni = ?', [req.params.dni], (error, results) => {
        if (error) throw new Error('Error in getUserById');
        res.status(200).json(results);
    })
}

const registerUser = (req, res) => {
    const {dni, name, birth_date, direction, iban, phone_number, email, user, password} = req.body;
    connection.query('INSERT INTO user (dni, name, birth_date, direction, iban, phone_number, email, user, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [dni, name, birth_date, direction, iban, phone_number, email, user, password], (error, results) => {
        if (error) throw new Error('Error in register');
        res.status(201).json(results);
    })
}

const loginUser = (req, res) => {
    const {user, password} = req.body;
    connection.query('SELECT user, password FROM user WHERE user = ?', [user], (error, results) => {
        if (error) throw new Error('Error in loginUser');
        if (results[0].password === password){
            res.status(200).json('Login successful');
        } else {
            res.status(400).json('Invalid credentials')
        }
    })
}

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
}