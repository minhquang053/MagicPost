const express = require('express');
const {
  httpGetAllTransfers,
  httpGetTransferById,
  httpFinishTransferById,
  httpAddNewTransfer,
} = require('./transfers.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const transfersRouter = express.Router();

transfersRouter.use(validateUser);
transfersRouter.use(extractAuthorization);

transfersRouter.get('/', httpGetAllTransfers);
transfersRouter.get('/:id', httpGetTransferById);
transfersRouter.post('/', httpAddNewTransfer);
transfersRouter.patch('/:id', httpFinishTransferById)

module.exports = transfersRouter;
