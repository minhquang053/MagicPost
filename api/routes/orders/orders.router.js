const express = require('express');
const {
    httpGetAllOrders,
    httpGetOrdersById,
    httpAddNewOrder,
} = require('./orders.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const ordersRouter = express.Router();

ordersRouter.use(validateUser);
ordersRouter.use(extractAuthorization);

/*
ordersRouter.get('/', httpGetAllOrders);
ordersRouter.get('/:id', httpGetOrdersById);
ordersRouter.post('/', httpAddNewOrder);
*/

module.exports = ordersRouter;