const {
    httpGetAllTransfers,
    httpGetTransferById,
    httpAddNewTransfer,
} = require('../../models/transfers.model');

async function httpGetAllTransfers(req, res) {
    // to use query later
    const query = req.body;
    const requestingUser = await getUserById(req.uid)
    
    const transfers = await getAllTransfers(requestingUser.location);
    
    return res.status(200).json(transfers);
}

async function httpGetTransferById(req, res) {
    const transferId = Number(req.params.id);

    const transfer = await getTransferById(transferId);
    if (!transfer) {
        return res.status(404).json({
            error: 'Transfer not found',
        });
    }
    return res.status(200).json(order);
}

module.exports = {
    httpGetAllTransfers,
    httpGetTransferById,
}