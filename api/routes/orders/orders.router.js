const express = require('express');
const {
    httpGetAllOrders,
    httpGetOrdersById,
    httpAddNewOrder,
} = require('./orders.controller');

const ordersRouter = express.Router();

/*
ordersRouter.get('/', httpGetAllOrders);
ordersRouter.get('/:id', httpGetOrdersById);
ordersRouter.post('/', httpAddNewOrder);
*/

module.exports = ordersRouter;