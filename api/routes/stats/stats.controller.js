const {
    getOrderCountWithStatus,
    getOrderCountWithType,
    getOrderCountByMonths,
    getLatestOrders,
} = require('../../models/orders.model');
const { 
    getTransferCount, 
    getLatestTransfers,
    getTransferCountWithType,
    getTransferCountByMonths,
} = require('../../models/transfers.model');

async function httpGetOrderStats(req, res) {
    const location = req.query.loc;

    if (location.includes('E')) {
        const transferSucceed = await getTransferCount(true, location, true); 
        const transferOngoing = await getTransferCount(false, location, true);
        const transferIncoming = await getTransferCount(true, location, false);
        const transferOutgoing = transferSucceed + transferOngoing;

        const transferIn = await getTransferCountWithType(true, location);
        const transferOut = await getTransferCountWithType(false, location);
        const transferInPercentage = transferIn / (transferIn + transferOut) * 100;

        const latestTransfers = await getLatestTransfers(location);

        const monthCount = await getTransferCountByMonths(location);
        const numTransfer = new Array().fill(0);
        monthCount.forEach(item => {
            const monthIndex = item._id - 1; 
            numTransfer[monthIndex] = item.count;
        }); 

        const stats = {
            incoming: transferIncoming,
            outgoing: transferOutgoing,
            succeed: transferSucceed,
            ongoing: transferOngoing,
            num: numTransfer,
            type: {
                in: transferInPercentage,
                out: 100 - transferInPercentage,
            },
            latestTransfers: latestTransfers,
        }
        return res.status(200).json(stats);
    } else {
        const orderSucceed = await getOrderCountWithStatus(['done'], location, true);
        const orderFailed = await getOrderCountWithStatus(['failed'], location, true);
        const orderOngoing = await getOrderCountWithStatus(['processing', 'transferring'], location, true);
        const orderIncoming = orderSucceed + orderFailed + orderOngoing;
        const orderOutgoing = await getOrderCountWithStatus(['done'], location, false);

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
            incoming: orderIncoming,
            outgoing: orderOutgoing,
            succeed: orderSucceed,
            failed: orderFailed,
            ongoing: orderOngoing,
            num: numOrder,
            type: {
                document: orderDocumentPercentage,
                goods: 100 - orderDocumentPercentage,
            },
            latestOrders: latestOrders,
        } 
        return res.status(200).json(stats);
    }
}

module.exports = {
    httpGetOrderStats
}