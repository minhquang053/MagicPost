const { getTransfersByOrderId } = require('../../models/transfers.model');
const { getOrderById } = require('../../models/orders.model');

async function httpGetTrackingByOrderId(req, res) {
    const orderId = req.params.id;

    const order = await getOrderById(orderId);
    const transfers = await getTransfersByOrderId(orderId);

    if (!order) {
        return res.status(400).json({
            error: "Order not found" 
        })
    }

    return res.status(200).json({
        order: order,
        transfers: transfers, 
    });
}

module.exports = {
    httpGetTrackingByOrderId,
}