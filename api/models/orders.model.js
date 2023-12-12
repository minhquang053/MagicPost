const Order = require('./orders.mongo');

const {
    generateOrderId
} = require('../services/uuid');

async function getAllOrders(sendLoc) {
    return await Order
        .find({ sendLocation: sendLoc })
};

async function getOrderById(orderId) {
    return await Order
        .findOne({ orderId: orderId })
}

async function changeOrderStatusById(orderId, newStatus) {
    const order = await getOrderById(orderId);
    if (!order) {
        return null;
    }
    order.orderStatus = newStatus;
    order.save();
    return order;
}

async function saveOrder(order) {
    await Order.create(order);
}

async function createNewOrder(order) {
    const now = new Date().toLocaleString();

    const newOrder = Object.assign(order, {
        orderId: generateOrderId(),
        orderStatus: "processing",
        startLocation: order.startLocation,
        senderInfo: order.senderInfo,
        recipientInfo: order.recipientInfo,
        cost: order.costInfo,
        weight: order.weightInfo,
        createdDate: now,
    })
    await saveOrder(newOrder);
    
    return newOrder;
}

module.exports = {
    getAllOrders,
    getOrderById,
    changeOrderStatusById,
    createNewOrder,
}