const express = require('express');
const {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
    httpChangeOrderStatusById,
} = require('./orders.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const ordersRouter = express.Router();

ordersRouter.use(validateUser);
ordersRouter.use(extractAuthorization);

ordersRouter.get('/', httpGetAllOrders);
ordersRouter.get('/:id', httpGetOrderById);
ordersRouter.post('/', httpAddNewOrder);
ordersRouter.patch('/:id', httpChangeOrderStatusById);

module.exports = ordersRouter;