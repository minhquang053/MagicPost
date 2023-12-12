const Order = require('./orders.mongo');

const {
    generateOrderId
} = require('../services/uuid');

async function getAllOrders(startLoc, endLoc, searchTerm) {
    const startRegex = new RegExp(startLoc, 'i');
    const endRegex = new RegExp(endLoc, 'i');
    const termRegex = new RegExp(searchTerm, 'i');
    return await Order
        .find({ startLocation: startRegex, 
            endLocation: endRegex, 
            orderId: termRegex 
        }).select('orderId -_id orderStatus startLocation endLocation goodsType createdDate')
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
        endLocation: order.endLocation,
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