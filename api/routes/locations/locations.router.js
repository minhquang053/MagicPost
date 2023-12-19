const express = require('express');
const {
    httpGetLocationByFromLocation,
    httpGetLocationByProvince
} = require('./locations.controller');

const locationsRouter = express.Router();

// locationsRouter.post('/', httpAddLocation);
locationsRouter.get('/', httpGetLocationByProvince)
locationsRouter.get('/:id', httpGetLocationByFromLocation);

module.exports = locationsRouter;