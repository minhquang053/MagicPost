const express = require('express');
const {
  httpGetAllTransfers,
  httpGetTransferById,
} = require('./transfers.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const transfersRouter = express.Router();

transfersRouter.use(validateUser);
transfersRouter.use(extractAuthorization);

transfersRouter.get('/', httpGetAllTransfers);
transfersRouter.get('/:id', httpGetTransferById);

// Transfers will be automatically created when orders are added

module.exports = transfersRouter;