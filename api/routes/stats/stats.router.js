const express = require('express');
const {
    httpGetOrderStats,
} = require('./stats.controller');
const { validateUser } = require('../../middlewares/authentication');
const { extractAuthorization } = require('../../middlewares/authorization');

const statsRouter = express.Router();

statsRouter.use(validateUser);
statsRouter.use(extractAuthorization);

statsRouter.get('/', httpGetOrderStats);

module.exports = statsRouter;