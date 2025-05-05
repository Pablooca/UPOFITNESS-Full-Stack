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
app.use('/api/worker', require('./routes/workerRoutes'));
app.use('/api/appointment', require('./routes/appointmentRoutes'));
app.use('/api/diets', require('./routes/dietRoutes'));

app.use(errorHandler);

app.get('/', (req, res) => res.send('API is running...'));


app.listen(port, () => console.log(`Server is running on port ${port}`.magenta.underline.italic));