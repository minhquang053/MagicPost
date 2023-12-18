const Transfer = require('./transfers.mongo');

const {
    generateTransferId
} = require('../services/uuid');

async function getAllTransfers(sendLoc) {
    return await Transfer
        .find({ fromLoc: sendLoc })
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
    transfer.done = true;
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