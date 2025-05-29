const { getPool } = require('../config/db');

const pool = getPool();

const getAppointments = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM appointment');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error in getAppointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAppointmentByUser = async (req, res) => {
    const userId = req.params.user_id;
    console.log(req.params);
    console.log(userId);

    try {
        pool.query('SELECT * FROM appointment WHERE id_user = $1', [userId], (error, results) => {
            if (error) {
                console.error('Error in getAppointmentByUser:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.error('Error in getAppointmentByUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

const getAppointmentByWorker = async (req, res) => {
    const workerId = req.params.worker_id;
    console.log(workerId);

    try {
        pool.query('SELECT * FROM appointment WHERE id_worker = $1', [workerId], (error, results) => {
            if (error) {
                console.error('Error in getAppointmentByWorker:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json(results.rows);
        })
    } catch (error) {
        console.error('Error in getAppointmentByWorker:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

// const getAppointmentByWorker = (req, res) => {
//     const workerId = req.worker.dni;
//     connection.query('SELECT * FROM appointment WHERE id_worker = ?', [workerId], (error, results) => {
//         if (error) throw new Error('Error in getAppointmentByWorker');
//         res.status(200).json(results);
//     })
// }


const getAppointmentByDate = (req, res) => {
    const date = req.params.date;
    console.log(date);

    pool.query('SELECT * FROM appointment WHERE date = $1', [date], (error, results) => {
        if (error) {
            console.error('Error in getAppointmentByDate:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results.rows);
    })

}

// const getAppointmentByDate = (req, res) => {
//     connection.query('SELECT * FROM appointment WHERE date = ?', [req.params.date], (error, results) => {
//         if (error) throw new Error('Error in getAppointmentByDate');
//         res.status(200).json(results);
//     })
// }

const createAppointment = async (req, res) => {
    const { date, id_worker, id_user } = req.body;
    console.log('Creating appointment:', req.body);
    if (!date || !id_worker || !id_user) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    pool.query('INSERT INTO appointment (date, id_worker, id_user) VALUES ($1, $2, $3)',
        [date, id_worker, id_user], (error, results) => {
            if (error) {
                console.error('Error in createAppointment:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json(results.rows);
        });

}

const delAppointment = (req, res) => {
    const appointmentId = req.params.id;
    console.log('Deleting appointment with ID:', appointmentId);

    pool.query('DELETE FROM appointment WHERE id = $1', [appointmentId], (error, results) => {
        if (error) {
            console.error('Error in delAppointment:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    });
}

const updateAppointment = (req, res) => {
    const { date, id } = req.body;
    console.log('Updating appointment with ID:', id, 'to date:', date);
    if (!date || !id) {
        return res.status(400).json({ error: 'Please provide date and id' });
    }
    pool.query('UPDATE appointment SET date = $1 WHERE id = $2', [date, id], (error, results) => {
        if (error) {
            console.error('Error in updateAppointment:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Appointment updated successfully' });
    });
}

module.exports = {getAppointments,getAppointmentByUser, getAppointmentByWorker, getAppointmentByDate, createAppointment, delAppointment, updateAppointment};