const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    orderName: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    sendLocation: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    senderPhone: {
        type: String,
        required: true,
    },
    recipientName: {
        type: String,
        required: true,
    },
    recipientPhone: {
        type: String,
        required: true,
    },
    recipientAddress: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
    doneDate: {
        type: String,
        required: false,
    },
    cost: {
        type: mongoose.Schema.Types.Mixed,
        required: true, 
    },
    weight: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Order', ordersSchema);