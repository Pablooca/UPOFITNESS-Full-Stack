const mongoose = require('mongoose');

const dietSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'Please add an user']
    },
    worker_id: {
        type: String,
        required: [true, 'Please add a worker']
    },
    meals: {
        type: [String], // Array of strings
        required: [true, 'Please add meals']
    }
});

module.exports = mongoose.model('Diet', dietSchema);