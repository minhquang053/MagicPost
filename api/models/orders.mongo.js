const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    orderTitle: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Order', ordersSchema);