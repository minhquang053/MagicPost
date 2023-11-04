const Transfer = require('./transfers.mongo');

const {
    generateTransferId
} = require('../services/uuid');

async function getAllTransfers(sendLoc) {
    return await Transfer
        .find({ sendlocation: sendLoc });
};

async function getTransferById(transferId) {
    return await Transfer
        .findOne({ transferId: transferId });
}

async function getTransfersByOrderId(orderId) {
    return await Transfer
        .find({ orderId: orderId });
}

async function saveTransfer(transfer) {
    await Transfer.create(transfer);
}

async function createNewTransfer(transfer) {
    const newTransfer = Object.assign(transfer, {
        transferId: generateTransferId(),
        orderId: transfer.orderId,
        fromLoc: transfer.fromLoc,
        toLoc: transfer.toLoc,
        receiveDate: transfer.receiveDate,
        forwardDate: transfer.forwardDate,
        done: false,
    })
    await saveTransfer(newTransfer);
}

module.exports = {
    getAllTransfers,
    getTransferById,
    getTransfersByOrderId,
    createNewTransfer,
}