const getAppointments = (req, res) => {
    connection.query('SELECT * FROM appointment', (error, results) => {
        if (error) throw new Error('Error in getAppointment');
        res.status(200).json(results);
    })
}

const getAppointmentByUser = (req, res) => {
    connection.query('SELECT * FROM appointment WHERE id_user = ?', [req.params.user_id], (error, results) => {
        if (error) throw new Error('Error in getAppointmentByUser');
        res.status(200).json(results);
    })
}

const getAppointmentByWorker = (req, res) => {
    connection.query('SELECT * FROM appointment WHERE id_worker = ?', [req.params.worker_id], (error, results) => {
        if (error) throw new Error('Error in getAppointmentByWorker');
        res.status(200).json(results);
    })
}

const getAppointmentByDate = (req, res) => {
    connection.query('SELECT * FROM appointment WHERE date = ?', [req.params.date], (error, results) => {
        if (error) throw new Error('Error in getAppointmentByDate');
        res.status(200).json(results);
    })
}

const createAppointment = (req, res) => {
    const {date, id_worker, id_user} = req.body;
    connection.query('INSERT INTO appointment (date, id_worker, id_user) VALUES (?, ?, ?)', [date, id_worker, id_user], (error, results) => {
        if (error) throw new Error('Error in createAppointment');
        res.status(201).json(results);
    })
}

const delAppointment = (req, res) => {
    connection.query('DELETE FROM appointment WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw new Error('Error in delAppointment');
        res.status(201).json(results);
    })
}

const updateAppointment = (req, res) => {
    connection.query('UPDATE appointment SET date = ?, id_worker = ? WHERE id = ?', [req.body.date, req.body.id_worker, req.params.id], (error, results) => {
        if (error) throw new Error('Error in updateAppointment');
        res.status(201).json(results);
    })
}

module.exports = {getAppointments,getAppointmentByUser, getAppointmentByWorker, getAppointmentByDate, createAppointment, delAppointment, updateAppointment};