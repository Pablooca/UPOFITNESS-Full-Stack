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
    diet: {
        type: Object,
        required: [true, 'Please add a diet']
    }
})

module.exports = mongoose.model('Diets', dietSchema);