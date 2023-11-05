const express = require('express');

const usersRouter = require('./users/users.router');
const ordersRouter = require('./orders/orders.router');
const transfersRouter = require('./transfers/transfers.router');
const loginRouter = require('./login/login.router');
const trackingRouter = require('./tracking/tracking.router');

const api = express.Router();

api.use('/users', usersRouter);
api.use('/orders', ordersRouter);
api.use('/transfers', transfersRouter);
api.use('/login', loginRouter);
api.use('/tracking', trackingRouter)

module.exports = api;