const mongoose = require('mongoose');

const transfersSchema = new mongoose.Schema({
    transferId: {
        type: String,
        required: true,
    },
    orderId: {
        required: true,
    },
    fromLoc: {
        type: String,
        required: true,
    },
    toLoc: {
        type: String,
        required: true, 
    },
    receiveDate: {
        type: String,
        required: false,
    },
    forwardDate: {
        type: String,
        required: false,
    },
    done: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Transfer', transfersSchema);