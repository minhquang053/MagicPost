const express = require('express');
const {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
} = require('./orders.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const ordersRouter = express.Router();

ordersRouter.use(validateUser);
ordersRouter.use(extractAuthorization);

ordersRouter.get('/', httpGetAllOrders);
ordersRouter.get('/:id', httpGetOrderById);
ordersRouter.post('/', httpAddNewOrder);

module.exports = ordersRouter;