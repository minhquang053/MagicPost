const {
    getAllOrders,
    getOrderById,
    createNewOrder,
} = require('../../models/orders.model');

const { getTransfersByOrderId, createNewTransfer } = require('../../models/transfers.model');
const { validateOrderInfo, findTransferPath } = require('../../services/internal');

async function httpGetAllOrders(req, res) {
    const userId = req.uid;
    const requestingUser = await getUserById(userId)

    const orders = await getAllOrders(requestingUser.location);
    
    return res.status(200).json(orders);
}

async function httpGetOrderById(req, res) {
    const orderId = Number(req.params.id);

    const order = await getOrderById(orderId);
    if (!order) {
        return res.status(404).json({
            error: 'Order not found',
        });
    }

    // adding transferring information. 
    order.transfers = await getTransfersByOrderId(order.orderId);

    return res.status(200).json(order);
}

async function httpAddNewOrder(req, res) {
    const order = req.body;
 
    if (!validateOrderInfo({ sendLocation: order.sendLocation })) {
        return res.status(400).json({
            error: "Invalid sender location"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Processor" ||
        requestingUser.location !== order.sendLocation) {
        return res.status(401).json({
            error: "Require proper processor access"
        });
    }

    try {
        order = await createNewOrder(order); 
        
        const locs = findTransferPath(order);
        for (let i = 0; i < locs.length() - 1; i++) {
            await createNewTransfer({
                orderId: order.orderId,
                fromLoc: locs[i],
                toLoc: locs[i + 1],
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }

    try {
        
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        })
    }

    return res.status(201).json(order);
}

module.exports = {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
}