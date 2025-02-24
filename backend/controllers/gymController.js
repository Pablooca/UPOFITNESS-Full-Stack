const getGyms = (req, res) => {
    connection.query('SELECT * FROM gym', (error, results) => {
        if (error) throw new Error('Error in getGyms');
        res.status(200).json(results);
    })
}

const getGymByCity = (req, res) => {
    connection.query('SELECT * FROM gym WHERE city = ?', [req.params.city], (error, results) => {
        if (error) throw new Error('Error in getGymByCity');
        res.status(200).json(results);
    })
}

const createGym = (req, res) => {
    const {name, direction, city, timetable} = req.body;
    connection.query('INSERT INTO gym (name, direction, city, timetable) VALUES (?, ?, ?, ?)', [name, direction, city, timetable], (error, results) => {
        if (error) throw new Error('Error in createGym');
        res.status(201).json(results);
    })
}

const delGym = (req, res) => {
    connection.query('DELETE FROM gym WHERE id = ?', [req.params.id], (error, results) => {
        if (error) throw new Error('Error in DeleteGym');
        res.status(201).json(results);
    })
}

const updateGym = (req, res) => {
    connection.query('UPDATE gym SET name = ?, direction = ?, city = ?, timetable = ? WHERE id = ?', [req.body.name, req.body.direction, req.body.city, req.body.timetable, req.params.id], (error, results) => {
        if (error) throw new Error('Error in UpdateGym');
        res.status(201).json(results);
    })
}

module.exports = {getGyms, getGymByCity, createGym, delGym, updateGym};