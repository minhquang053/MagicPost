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
const { validateOrderInfo } = require('../../services/internal');

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

    console.log(order);

    return res.status(200).json(order);
}

async function httpChangeOrderStatusById(req, res) {
    const orderId = req.params.id;
    const newStatus = req.body.status;
    const targetOrder = await getOrderById(orderId);
    targetOrder.newStatus = newStatus;

    // if (!validateOrderInfo(targetOrder)) {
    //     return res.status(400).json({
    //         error: "Invalid status or status order"
    //     })
    // } 

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
    
    if (targetOrder.newStatus === 'done' && targetOrder.orderStatus !== 'shipping') {
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
    console.log(order);
 
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