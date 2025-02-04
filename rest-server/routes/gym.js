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

const getGymById = (request, response) => {
    connection.query("SELECT * FROM gym WHERE id = ?", [request.params.id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
}

// ruta
app.route("/gym/:id")
.get(getGymById);

const postGym = (request, response) => {
    const {name, direction, timetable} = request.body;
    connection.query("INSERT INTO gym (name, direction, timetable) VALUES (?, ?, ?)", [name, direction, timetable], (error, results) => {
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