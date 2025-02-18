/* 

    INSERTAR: db.posts.insertOne({
        OBJETO A INSERTAR
    })

    BUSCAR TODOS: db.posts.find()

    BUSCAR UN ELEMENTO: db.posts.find({}), en mi caso buscaría por DNI de usuario o por DNI de nutricionista

    ACTUALIZAR: db.posts.updateOne({OBJETO A BUSCAR}, {$set: {OBJETO A ACTUALIZAR}})

    ELIMINAR: db.posts.deleteOne({OBJETO A ELIMINAR})

*/

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;