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

async function checkMatchedTransfer(fromLoc, toLoc, orderId) {
    return await Transfer
        .findOne({ fromLocation: fromLoc, toLocation: toLoc, orderId: orderId});
}

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

async function getTransferCount(done, location, start) {
    const locRegex = new RegExp(location, 'i');
    if (start) {
        return await Transfer
            .countDocuments({ fromLocation: locRegex, done: done });
    } else {
        return await Transfer
            .countDocuments({ toLocation: locRegex, done: done })
    }
}

async function getTransferCountByMonths(location) {
    const locRegex = new RegExp(location, 'i');
    return await Transfer.aggregate([
        {
            $match: {
                fromLocation: locRegex,
            }
        },
        {
            $group: {
            _id: { $month: { $toDate: '$transferDate' } },
            count: { $sum: 1 }
            }
        }
        ]);
}

async function getTransferCountWithType(inc, location) {
    const locRegex = new RegExp(location, 'i');
    const partnerRegex = new RegExp(location[0], 'i');
    if (inc) {
        return await Transfer
            .countDocuments({ fromLocation: partnerRegex, toLocation: locRegex, done: true })
    } else {
        return await Transfer
            .countDocuments({ fromLocation: locRegex, toLocation: partnerRegex, done: true })
    }
}

async function getLatestTransfers(location) {
    const locRegex = new RegExp(location, 'i');
    return await Transfer
        .find({ fromLocation: locRegex }).sort({ transferDate: -1 }).limit(6);
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
    getTransferCountWithType,
    getLatestTransfers,
    getTransferCount,
    getTransferCountByMonths,
    checkMatchedTransfer,
    finishTransferById,
    getTransfersByOrderId,
    createNewTransfer,
}