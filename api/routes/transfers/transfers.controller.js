const {
    getAllTransfers,
    getTransferById,
    finishTransferById,
} = require('../../models/transfers.model');

const {
    getUserById,
} = require('../../models/users.model');

async function httpGetAllTransfers(req, res) {
    // to use query later
    const query = req.body;
    const requestingUser = await getUserById(req.uid)
    
    const transfers = await getAllTransfers(requestingUser.location);
    
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

async function httpFinishTransferById(req, res) {
    const transferId = req.params.id;
    
    const transfer = await finishTransferById(transferId);
    if (!transfer) {
        return res.status(400).json({
            error: "Transfer not found"
        });  
    }

    return res.status(200).json(transfer);
}

module.exports = {
    httpGetAllTransfers,
    httpGetTransferById,
    httpFinishTransferById,
}