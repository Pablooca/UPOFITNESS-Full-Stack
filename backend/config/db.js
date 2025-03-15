const mongoose = require('mongoose');
const mysql = require('mysql');

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        if (conn){
            console.log(`MongoDB Conected: ${conn.connection.host}`.cyan.underline);
        }
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}

const connectMySQL = async () => {
    try {
        connection = mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            port: process.env.DBPORT
        });
        if (connection){
            console.log(`MySQL DB Conected`.yellow.underline);
        }
    } catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = { connectMongoDB, connectMySQL};