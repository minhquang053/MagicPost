const {
    getAllTransfers,
    getTransferById,
    finishTransferById,
    createNewTransfer,
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

async function httpAddNewTransfer(req, res) {
    const transfer = req.body;
 
    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Processor" && requestingUser.role !== "Manager") {
        return res.status(401).json({
            error: "Require proper processor access"
        });
    }
    transfer.fromLocation = requestingUser.location;

    try {
        await createNewTransfer(transfer); 
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
    httpAddNewTransfer,
    httpFinishTransferById,
}