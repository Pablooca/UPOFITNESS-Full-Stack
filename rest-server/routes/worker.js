const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");
const utilities = require("../utilities"); // Importa el código de utilities

function getGymByIdCheck(id_gym, callback) {
    connection.query("SELECT * FROM gym WHERE id = ?", [id_gym], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
}

const getWorkers = (request, response) => {
    connection.query("SELECT * FROM worker", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/worker")
.get(getWorkers);

const getWorkerByDNI = (request, response) => {
    const dni = request.params.dni;
    connection.query("SELECT * FROM worker WHERE dni = ?", [dni], (error, results) =>{
        if (error) throw error;
        response.status(200).json(results);
    });
}
app.route("/worker/:dni")
.get(getWorkerByDNI);

const delWorker = (request, response) => {
    const dni = request.params.dni;
    connection.query("DELETE FROM worker WHERE dni = ?", [dni], (error, results) => {
        if (error) throw error;
        response.status(201).json({ "Worker deleted": results.affectedRows });
    });
};

// ruta
app.route("/worker/:dni")
.delete(delWorker);

const postWorker = (request, response) => {
    const { dni, name, birth_date, iban, email, user, password, id_gym } = request.body;
    getGymByIdCheck(id_gym, (error, results) => {
        if (error) return response.status(500).json({ error: "Error creating the new worker" });
        if(results.length===0) return response.status(404).json({ error: "Gym not found" });
        else {
            let ibanEncrypted = utilities.encrypt(iban);
            let passwordEncrypted = utilities.encrypt(password);
            connection.query("INSERT INTO worker (dni, name, birth_date, iban, email, user, password, id_gym) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [dni, name, birth_date, ibanEncrypted, email, user, passwordEncrypted, id_gym], (error, results) => {
                if (error) throw error;
                response.status(201).json({ "Worker created": results.affectedRows });
            });
        }
    });
};

app.route("/worker")
.post(postWorker);

module.exports = app;