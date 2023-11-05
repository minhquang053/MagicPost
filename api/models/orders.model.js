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
        orderName: order.orderName,
        orderStatus: "processing",
        sendLocation: order.sendLocation, 
        senderName: order.senderName,
        senderPhone: order.senderPhone,
        recipientName: order.recipientName,
        recipientPhone: order.recipientPhone,
        recipientAddress: order.recipientAddress,
        createdDate: now,
        cost: order.cost,
        weight: order.weight,
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