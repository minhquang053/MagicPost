const {
    getOrderCountWithStatus,
    getOrderCountWithType,
    getOrderCountByMonths,
    getLatestOrders,
} = require('../../models/orders.model');

async function httpGetOrderStats(req, res) {
    const location = req.query.loc;

    const orderSucceed = await getOrderCountWithStatus(['done'], location);
    const orderFailed = await getOrderCountWithStatus(['failed'], location);
    const orderOngoing = await getOrderCountWithStatus(['processing', 'transferring'], location);

    const orderDocument = await getOrderCountWithType('document', location);
    const orderGoods = await getOrderCountWithType('goods', location);
    const orderDocumentPercentage = orderDocument / (orderDocument + orderGoods) * 100;
    
    const latestOrders = await getLatestOrders(location);

    const monthCount = await getOrderCountByMonths(location);
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