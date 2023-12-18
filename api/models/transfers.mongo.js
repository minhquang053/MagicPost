const mongoose = require('mongoose');

const transfersSchema = new mongoose.Schema({
    transferId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    fromLocation: {
        type: String,
        required: true,
    },
    toLocation: {
        type: String,
        required: true, 
    },
    transferDate: {
        type: String,
        required: true,
    },
    confirmDate: {
        type: String,
        required: false,
    },
    done: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Transfer', transfersSchema);