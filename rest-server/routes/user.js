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

const getUsers = (request, response) => {
    connection.query("SELECT dni, name, birth_date, direction, phone_number, email, user FROM user", (error, results) => {
        if (error) throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/user")
.get(getUsers);

const postUser = (request, response) => {
    const { dni, name, birth_date, direction, iban, phone_number, email, user, password } = request.body;
    let ibanEncrypted = utilities.encrypt(iban);
    let passwordEncrypted = utilities.encrypt(password);
    let dniCorrecto = comprobarDNI(dni);

    if (!dniCorrecto){
        response.status(400).json({ "Incorrect DNI": "DNI Letter is not correct" });
        return;
    }

    connection.query("INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [dni, name, birth_date, direction, ibanEncrypted, phone_number, email, user, passwordEncrypted], (error, results) => {
        if (error) throw error;
        response.status(201).json({ "User created": results.affectedRows });
    });
};

// ruta
app.route("/user")
.post(postUser);

const getUserByDNI = (request, response) => {
    const dni = request.params.dni;
    let dniCorrecto = comprobarDNI(dni);
    if (!dniCorrecto){
        response.status(400).json({ "Incorrect DNI": "DNI Letter is not correct" });
        return;
    }
    connection.query("SELECT dni, name, birth_date, direction, phone_number, email, user FROM user WHERE dni = ?", [dni], (error, results) =>{
        if (error) throw error;
        response.status(200).json(results);
    });
}
app.route("/user/:dni")
.get(getUserByDNI);

const delUser = (request, response) => {
    const dni = request.params.dni;
    console.log(dni);
    connection.query("DELETE FROM user WHERE dni = ?", [dni], (error, results) => {
        if (error) throw error;
        response.status(201).json({ "User deleted": results.affectedRows });
    });
};

// ruta
app.route("/user/:dni")
.delete(delUser);

module.exports = app;