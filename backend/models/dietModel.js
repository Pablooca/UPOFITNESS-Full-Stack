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
        type: [String],
        required: [true, 'Please add a worker']
    },
});

module.exports = mongoose.model('Diet', dietSchema);