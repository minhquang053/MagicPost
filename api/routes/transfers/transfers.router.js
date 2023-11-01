const express = require('express');
const {
  httpGetAllTransfers,
  httpGetTransfersById,
  httpAddNewTransfers,
} = require('./transfers.controller');

const transfersRouter = express.Router();

/*
transfersRouter.get('/', httpGetAllTransfers);
transfersRouter.get('/:id', httpGetTransfersById);
transfersRouter.post('/', httpAddNewTransfers);
*/

module.exports = transfersRouter;