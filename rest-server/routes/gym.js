const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const {connection} = require("../config.db");

const getGyms = (request, response) => {
    connection.query("SELECT * FROM gym", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/gym")
.get(getGyms);

const getGymByCity = (request, response) => {
    connection.query("SELECT * FROM gym WHERE city = ?", [request.params.city], (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/gym/:city")
.get(getGymByCity);

const postGym = (request, response) => {
    const {name, direction,city, timetable} = request.body;
    connection.query("INSERT INTO gym (name, direction, city, timetable) VALUES (?, ?, ?, ?)", [name, direction, city, timetable], (error, results) => {
        if (error) throw error;
        response.status(201).json({"Gym created": results.affectedRows});
    });
};

// ruta
app.route("/gym")
.post(postGym);

const delGym = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM gym WHERE id = ?", [id],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Gym deleted": results.affectedRows});
    });
};

// ruta
app.route("/gym/:id")
.delete(delGym);

module.exports = app;