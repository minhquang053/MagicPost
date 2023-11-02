const express = require('express');
const {
  httpGetAllTransfers,
  httpGetTransfersById,
  httpAddNewTransfers,
} = require('./transfers.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const transfersRouter = express.Router();

transfersRouter.use(validateUser);
transfersRouter.use(extractAuthorization);

/*
transfersRouter.get('/', httpGetAllTransfers);
transfersRouter.get('/:id', httpGetTransfersById);
transfersRouter.post('/', httpAddNewTransfers);
*/

module.exports = transfersRouter;