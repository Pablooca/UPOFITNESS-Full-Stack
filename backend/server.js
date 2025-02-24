const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const {connectMongoDB , connectMySQL} = require('./config/db');
const port = process.env.PORT || 5000;

connectMongoDB();
connectMySQL();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/gym', require('./routes/gymRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`.magenta.underline.italic));