const mongoose = require('mongoose');

const transfersSchema = new mongoose.Schema({
    transferId: {
        type: mongoose.Schema.Types.ObjectId,
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
    sendDate: {
        type: Date,
        required: true,
    },
    receiveDate: {
        type: Date,
        required: false,
    },
    status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Transfer', transfersSchema);