const express = require('express');

const {
    httpGetTrackingByOrderId
} = require('./tracking.controller');

const trackingRouter = express.Router();

trackingRouter.get('/:id', httpGetTrackingByOrderId);

module.exports = trackingRouter;