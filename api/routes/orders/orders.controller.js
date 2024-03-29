const {
    getAllOrders,
    getOrderById,
    changeOrderStatusById,
    createNewOrder,
} = require('../../models/orders.model');
const { getLatestTransferByOrderId } = require('../../models/transfers.model');

const {
    getUserById
} = require('../../models/users.model');
const { hasAnyEmptyField } = require('../../services/internal');
const { isVietnamesePhoneNumberValid } = require('../../services/validator');

async function httpGetAllOrders(req, res) {
    const query = req.query

    const orders = await getAllOrders(query.start, query.end, query.type, query.status, query.searchTerm);
    
    return res.status(200).json(orders);
}

async function httpGetOrderById(req, res) {
    const orderId = req.params.id;

    const order = await getOrderById(orderId);
    if (!order) {
        return res.status(404).json({
            error: 'Order not found',
        });
    }

    return res.status(200).json(order);
}

async function httpChangeOrderStatusById(req, res) {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const targetOrder = await getOrderById(orderId);
    targetOrder.newStatus = newStatus; 

    if (targetOrder.newStatus === 'shipping') {
        const latestTransfer = await getLatestTransferByOrderId(orderId);
        if (!latestTransfer) {
            return res.status(500).json({
                error: "Order not ready for shipping"
            })
        }
        if (latestTransfer.toLocation !== targetOrder.endLocation) {
            return res.status(400).json({
                error: "Invalid end location"
            })
        } 
    }
    
    if ((targetOrder.newStatus === 'done' || targetOrder.newStatus === 'failed') 
        && targetOrder.orderStatus !== 'shipping') {
        return res.status(400).json({
            error: "Not shipped"
        })
    }


    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== 'Transactor') {
        return res.status(401).json({
            error: "Permission required"
        });
    }

    try {
        const order = await changeOrderStatusById(orderId, newStatus);
        if (!order) {
            return res.status(400).json({
                error: "Order not found"
            })
        }

        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json({
            error: "Couldn't change order status" 
        })
    }    
}

async function httpAddNewOrder(req, res) {
    const order = req.body;
    console.log(order);

    if (hasAnyEmptyField(order)) {
        return res.status(400).json({
            error: "Missing information"
        })
    }
 
    if (!isVietnamesePhoneNumberValid(order.senderInfo.phoneNumber) || !isVietnamesePhoneNumberValid(order.recipientInfo.phoneNumber)) {
        return res.status(400).json({
            error: "Invalid phone number"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Transactor") {
        return res.status(401).json({
            error: "Require proper processor access"
        });
    }
    order.startLocation = requestingUser.location;

    try {
        await createNewOrder(order); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }

    return res.status(201).json(order);
}

module.exports = {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
    httpChangeOrderStatusById,
}