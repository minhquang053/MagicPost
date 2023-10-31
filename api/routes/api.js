const express = require('express');

const usersRouter = require('./users/users.router');
const ordersRouter = require('./orders/orders.router');
const transfersRouter = require('./transfers/transfers.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/orders', ordersRouter);
api.use('/transfers', transfersRouter);

module.exports = api;