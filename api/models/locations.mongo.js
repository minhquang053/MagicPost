const mongoose = require('mongoose');

const locationsSchema = new mongoose.Schema({
    provinceName: {
        type: String,
        trim: true,
        required: true,
    },
    locationId: {
        type: String,
        trim: true,
        required: true,
    },
    assembleId: {
        type: String,
        trim: true,
        required: true,
    }
});

module.exports = mongoose.model('Location', locationsSchema);