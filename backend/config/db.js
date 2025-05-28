const mongoose = require('mongoose');
const mysql = require('mysql');
const { Pool } = require('pg');

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

let pool;

const connectPostgreSQL = async () => {
    
    try{
        pool = new Pool({
            host: process.env.DBHOST,
            port: process.env.DBPORT,
            database: process.env.DBNAME,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
        });

        await pool.query('SELECT NOW()');
        console.log('Conexión a PostgreSQL establecida correctamente'.green.underline);
    } catch(err){
        console.error('Error al conectar a PostgreSQL:', err);
        process.exit(1);
    }
}

const getPool = () => {
    if (!pool) {
        throw new Error('La base de datos no está conectada. Por favor, llama a connectPostgreSQL primero.');
    }
    return pool;
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

module.exports = { connectMongoDB, connectMySQL, connectPostgreSQL, getPool };