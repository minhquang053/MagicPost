const {
    getAllOrders,
    getOrderById,
    changeOrderStatusById,
    createNewOrder,
} = require('../../models/orders.model');

const {
    getUserById
} = require('../../models/users.model');
const { 
    createNewTransfer 
} = require('../../models/transfers.model');
const { validateOrderInfo, findTransferPath } = require('../../services/internal');

async function httpGetAllOrders(req, res) {
    const userId = req.uid;
    const requestingUser = await getUserById(userId)

    const orders = await getAllOrders(requestingUser.location);
    
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

    console.log(order);

    return res.status(200).json(order);
}

async function httpChangeOrderStatusById(req, res) {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const targetOrder = await getOrderById(orderId);
    targetOrder.newStatus = newStatus;

    if (!validateOrderInfo(targetOrder)) {
        return res.status(400).json({
            error: "Invalid status or status order"
        })
    }

    if (targetOrder.orderStatus === targetOrder.newStatus) {
        return res.status(400).json({
            error: "New status is the same as before"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== 'Processor') {
        return res.status(401).json({
            error: "Permission required"
        });
    }

    const order = await changeOrderStatusById(orderId, newStatus);

    if (!order) {
        return res.status(400).json({
            error: "Order not found"
        })
    }

    return res.status(200).json(order);
}

async function httpAddNewOrder(req, res) {
    const order = req.body;
 
    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Processor" && requestingUser.role !== "Manager") {
        return res.status(401).json({
            error: "Require proper processor access"
        });
    }
    order.startLocation = requestingUser.location;
    console.log(order);

    try {
        const createdOrder = await createNewOrder(order); 
        
        const locs = findTransferPath(createdOrder);
        for (let i = 0; i < locs.length - 1; i++) {
            await createNewTransfer({
                orderId: createdOrder.orderId,
                fromLoc: locs[i],
                toLoc: locs[i + 1],
            });
        }
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