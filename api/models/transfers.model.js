const Transfer = require('./transfers.mongo');

const {
    generateTransferId
} = require('../services/uuid');

async function getAllTransfers(fromLoc, toLoc, status, searchTerm) {
    const fromRegex = new RegExp(fromLoc, 'i');
    const toRegex = new RegExp(toLoc, 'i');
    const termRegex = new RegExp(searchTerm, 'i');
    console.log(status);
    let statusValues;
    if (status === 'done') {
        statusValues = true;
    } else if (status === 'transferring') {
        statusValues = false;
    } else {
        statusValues = { $in: [true, false] };
    }
    
    return await Transfer
        .find({
            fromLocation: fromRegex, 
            toLocation: toRegex,
            done: statusValues,
            $or: [
                { transferId: { $regex: termRegex } },
                { orderId: { $regex: termRegex } }
            ]
        }).select('-_id')
};

async function getTransferById(transferId) {
    return await Transfer
        .findOne({ transferId: transferId })
}

async function getLatestTransferByOrderId(orderId) {
    return await Transfer 
        .findOne({ orderId: orderId, done: true })
        .sort({ confirmDate: -1 })
        .exec();
}

async function getTransfersByOrderId(orderId) {
    return await Transfer
        .find({ orderId: orderId })
}

async function finishTransferById(transferId) {
    const transfer = await getTransferById(transferId);
    if (!transfer) {
        return null;
    }
    const now = new Date().toLocaleString();
    transfer.done = true;
    transfer.confirmDate = now; 
    transfer.save();
    return transfer;
}

async function saveTransfer(transfer) {
    await Transfer.create(transfer);
}

async function createNewTransfer(transfer) {
    const now = new Date().toLocaleString();

    const newTransfer = Object.assign(transfer, {
        transferId: generateTransferId(),
        orderId: transfer.orderId,
        fromLocation: transfer.fromLocation,
        toLocation: transfer.toLocation,
        transferDate: now,
        done: false,
    })
    await saveTransfer(newTransfer);
}

module.exports = {
    getAllTransfers,
    getTransferById,
    getLatestTransferByOrderId,
    finishTransferById,
    getTransfersByOrderId,
    createNewTransfer,
}