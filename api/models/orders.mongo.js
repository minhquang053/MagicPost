const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: {
        required: true,
    },
    orderTitle: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Order', ordersSchema);