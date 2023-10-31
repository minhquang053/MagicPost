const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: {
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', usersSchema);