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
    connection.query('INSERT INTO worker (dni, name, birth_date, iban, email, user, password, id_gym) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [dni, name, birth_date, iban, email, user, password, id_gym], (error, results) => {
        if (error) throw new Error('Error in registerWorker');
        res.status(201).json(results);
    })
}

const loginWorker = (req, res) => {
    const {user, password} = req.body;
    connection.query('SELECT user, password FROM worker WHERE user = ?', [user], (error, results) => {
        if (error) throw new Error('Error in loginWorker');
        if (results[0].password === password){
            res.status(200).json('Login successful');
        } else {
            res.status(400).json('Invalid credentials')
        }
    })
}

module.exports = {
    getWorkers,
    getWorkerById,
    registerWorker,
    loginWorker,
}