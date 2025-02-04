const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");
const utilities = require("../utilities"); // Importa el código de utilities

const getUsers = (request, response) => {
    connection.query("SELECT * FROM user", (error, results) => {
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
    connection.query("SELECT * FROM user WHERE dni = ?", [dni], (error, results) =>{
        if (error) throw error;
        response.status(200).json(results);
    });
}
app.route("/user/:dni")
.get(getUserByDNI);

const delUser = (request, response) => {
    const dni = request.params.dni;
    connection.query("DELETE FROM user WHERE dni = ?", [dni], (error, results) => {
        if (error) throw error;
        response.status(201).json({ "User deleted": results.affectedRows });
    });
};

// ruta
app.route("/gym/:dni")
.delete(delUser);

module.exports = app;