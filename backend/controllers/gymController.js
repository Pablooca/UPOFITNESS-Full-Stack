const { getPool } = require('../config/db');

const pool = getPool();

const getGyms = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gym');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error obtaining the gyms:', error);
        res.status(500).json({ error: 'Intern error of the server' });
    }
}

const getGymByCity = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM gym WHERE city = $1', [req.params.city]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No gyms found in this city' });
        }
        res.status(200).json(result.rows);
    } catch (error){
        console.error('Error filtering by city:', error);
        res.status(500).json({ error: 'Intern error of the server' });
    }
}

const createGym = async (req, res) => {
    const { name, direction, city, timetable } = req.body;
    try {
        const result = await pool.query('INSERT INTO gym (name, direction, city, timetable) VALUES ($1, $2, $3, $4) RETURNING *', [name, direction, city, timetable]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating the gym:', error);
        res.status(500).json({ error: 'Intern error of the server' });
    }
}

const delGym = (req, res) => {
    pool.query('DELETE FROM gym WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
            console.error('Error deleting the gym:', error);
            return res.status(500).json({ error: 'Intern error of the server' });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.status(200).json({ message: 'Gym deleted successfully' });
    });
}

const updateGym = async (req, res) => {
    const { name, direction, city, timetable } = req.body;
    try {
        const result = await pool.query('UPDATE gym SET name = $1, direction = $2, city = $3, timetable = $4 WHERE id = $5 RETURNING *', [name, direction, city, timetable, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Gym not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating the gym:', error);
        res.status(500).json({ error: 'Intern error of the server' });
    }
}

module.exports = {getGyms, getGymByCity, createGym, delGym, updateGym};