const express = require('express');

const usersRouter = require('./users/users.router');
const ordersRouter = require('./orders/orders.router');
const transfersRouter = require('./transfers/transfers.router');
const loginRouter = require('./login/login.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/orders', ordersRouter);
api.use('/transfers', transfersRouter);
api.use('/login', loginRouter);

module.exports = api;