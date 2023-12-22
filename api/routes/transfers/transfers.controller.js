const { getOrderById, changeOrderStatusById } = require('../../models/orders.model');
const {
    getAllTransfers,
    getTransferById,
    finishTransferById,
    createNewTransfer,
    checkMatchedTransfer,
} = require('../../models/transfers.model');

const {
    getUserById,
} = require('../../models/users.model');

async function httpGetAllTransfers(req, res) {
    // to use query later
    const query = req.query;
    
    const transfers = await getAllTransfers(query.from, query.to, query.status, query.searchTerm);
    
    return res.status(200).json(transfers);
}

async function httpGetTransferById(req, res) {
    const transferId = req.params.id;

    const transfer = await getTransferById(transferId);
    if (!transfer) {
        return res.status(404).json({
            error: 'Transfer not found',
        });
    }
    return res.status(200).json(transfer);
}

async function httpAddNewTransfer(req, res) {
    const transfer = req.body;
    const order = await getOrderById(transfer.orderId);
 
    if (!order) {
        return res.status(400).json({
            error: "Order not found"
        });
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Transactor" && requestingUser.role !== "Processor") {
        return res.status(401).json({
            error: "Require proper processor access"
        });
    }

    if (transfer.fromLocation !== requestingUser.location) {
        return res.status(400).json({
            error: "Invalid user location",
        })
    }

    const matchedTransfer = await checkMatchedTransfer(transfer.fromLocation, transfer.toLocation, transfer.orderId);
    console.log(matchedTransfer);
    if (matchedTransfer) {
        return res.status(400).json({
            error: "Transfer matched",
        })
    } 

    try {
        await createNewTransfer(transfer); 
        if (order.orderStatus === 'processing') {
            await changeOrderStatusById(order.orderId, 'transferring');
        } 
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }

    return res.status(201).json(transfer);
}

async function httpFinishTransferById(req, res) {
    const transferId = req.params.id;
    
    const transfer = await getTransferById(transferId);
    if (!transfer) {
        return res.status(400).json({
            error: "Transfer not found"
        });  
    }

    const requestingUser = await getUserById(req.uid);
    if (transfer.toLocation !== requestingUser.location) {
        return res.status(400).json({
            error: "Package not available at your location",
        })
    }

    const confirmedTransfer = await finishTransferById(transferId);

    return res.status(200).json(confirmedTransfer);
}

module.exports = {
    httpGetAllTransfers,
    httpGetTransferById,
    httpAddNewTransfer,
    httpFinishTransferById,
}