const {
    getOrderCountWithStatus,
    getOrderCountWithType,
    getOrderCountByMonths,
    getLatestOrders,
} = require('../../models/orders.model');

async function httpGetOrderStats(req, res) {
    const query = req.query

    const orderSucceed = await getOrderCountWithStatus(['done']);
    const orderFailed = await getOrderCountWithStatus(['failed']);
    const orderOngoing = await getOrderCountWithStatus(['processing', 'transferring']);

    const orderDocument = await getOrderCountWithType('document');
    const orderGoods = await getOrderCountWithType('goods');
    const orderDocumentPercentage = orderDocument / (orderDocument + orderGoods) * 100;
    
    const latestOrders = await getLatestOrders();

    const monthCount = await getOrderCountByMonths();
    const numOrder = new Array().fill(0);
    monthCount.forEach(item => {
        const monthIndex = item._id - 1; 
        numOrder[monthIndex] = item.count;
    });

    const stats = {
        succeed: orderSucceed,
        failed: orderFailed,
        ongoing: orderOngoing,
        numOrder: numOrder,
        type: {
            document: orderDocumentPercentage,
            goods: 100 - orderDocumentPercentage,
        },
        latestOrders: latestOrders,
    } 
    return res.status(200).json(stats);
}

module.exports = {
    httpGetOrderStats
}