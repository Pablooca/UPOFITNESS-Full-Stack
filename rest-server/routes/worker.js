const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");
const utilities = require("../utilities"); // Importa el código de utilities

function comprobarDNI (dni) {
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']
    dniNum = dni.slice(0, dni.length - 1);
    dniPartido = dni.slice(dni.length - 1);

    resto = dniNum % 23;
    letra = letras[resto];

    return letra === dniPartido ? true : false
}

function getGymByIdCheck(id_gym, callback) {
    connection.query("SELECT * FROM gym WHERE id = ?", [id_gym], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
}

const getWorkers = (request, response) => {
    connection.query("SELECT dni, name, birth_date, email, user, id_gym FROM worker", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/worker")
.get(getWorkers);

const getWorkerByDNI = (request, response) => {
    const dni = request.params.dni;
    let dniCorrecto = comprobarDNI(dni);
    if (!dniCorrecto){
        response.status(400).json({ "Incorrect DNI": "DNI Letter is not correct" });
        return;
    }
    connection.query("SELECT dni, name, birth_date, email, user, id_gym FROM worker WHERE dni = ?", [dni], (error, results) =>{
        if (error) throw error;
        response.status(200).json(results);
    });
}
app.route("/worker/:dni")
.get(getWorkerByDNI);

const delWorker = (request, response) => {
    const dni = request.params.dni;
    let dniCorrecto = comprobarDNI(dni);
    if (!dniCorrecto){
        response.status(400).json({ "Incorrect DNI": "DNI Letter is not correct" });
        return;
    }
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
    let dniCorrecto = comprobarDNI(dni);
    if (!dniCorrecto){
        response.status(400).json({ "Incorrect DNI": "DNI Letter is not correct" });
        return;
    }
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