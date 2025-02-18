const express = require("express");
const app = express();
app.use(express.json()); // Asegúrate de que el middleware para parsear JSON esté habilitado

const dotenv = require("dotenv");
dotenv.config();

const { connection } = require("../config.db");
const utilities = require("../utilities"); // Importa el código de utilities

function comprobarDNI(dni) {
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    const dniNum = dni.slice(0, dni.length - 1);
    const dniPartido = dni.slice(dni.length - 1);

    const resto = dniNum % 23;
    const letra = letras[resto];

    return letra === dniPartido;
}

function getWorkerByIdCheck(id_worker, callback) {
    connection.query("SELECT * FROM worker WHERE dni = ?", [id_worker], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
}

function getUserByIdCheck(id_user, callback) {
    connection.query("SELECT * FROM user WHERE dni = ?", [id_user], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
}

const getAppointments = (request, response) => {
    connection.query("SELECT * FROM appointment", (error, results) => {
        if (error) {
            console.error("Error fetching appointments:", error);
            return response.status(500).json({ error: "Error fetching appointments" });
        }
        response.status(200).json(results);
    });
};

app.route("/appointments")
    .get(getAppointments);

const postAppointment = (request, response) => {
    const { date, id_worker, id_user } = request.body;
    if (!date || !id_worker || !id_user) {
        return response.status(400).json({ error: "Missing required fields" });
    }

    let comprobacionDNIWorker = comprobarDNI(id_worker);
    let comprobacionDNIUser = comprobarDNI(id_user);

    if (!comprobacionDNIWorker){
        response.status(400).json({ "Incorrect DNI Worker": "DNI Letter is not correct" });
        return;
    }

    if (!comprobacionDNIUser){
        response.status(400).json({ "Incorrect DNI User": "DNI Letter is not correct" });
        return;
    }

    getWorkerByIdCheck(id_worker, (error, results) => {
        if (error) {
            console.error("Error checking worker:", error);
            return response.status(500).json({ error: "Error checking worker" });
        }
        if (results.length === 0) {
            return response.status(404).json({ error: "Worker not found" });
        } else {
            getUserByIdCheck(id_user, (error, results) => {
                if (error) {
                    console.error("Error checking user:", error);
                    return response.status(500).json({ error: "Error checking user" });
                }
                if (results.length === 0) {
                    return response.status(404).json({ error: "User not found" });
                } else {
                    connection.query("INSERT INTO appointment (date, id_worker, id_user) VALUES (?, ?, ?)", [date, id_worker, id_user], (error) => {
                        if (error) {
                            console.error("Error creating appointment:", error);
                            return response.status(500).json({ error: "Error creating the new appointment" });
                        }
                        response.status(201).json({ message: "Appointment created successfully" });
                    });
                }
            });
        }
    });
};

app.route("/appointments")
    .post(postAppointment);


const delAppointment = (request, response) => {
    const id = request.params.id;

    connection.query("DELETE FROM appointment WHERE id = ?", [id], (error, results) => {
        if (error) {
            console.error("Error deleting appointment:", error);
            return response.status(500).json({ error: "Error deleting the appointment" });
        }
        response.status(201).json({ message: "Appointment deleted successfully" });
    });
}

app.route("/appointments/:id")
    .delete(delAppointment);

module.exports = app;