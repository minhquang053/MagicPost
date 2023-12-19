const {
    getLocationById,
    getLocationByProvince
} = require('../../models/locations.model');
const { getOrderById } = require('../../models/orders.model');
const { getLatestTransferByOrderId } = require('../../models/transfers.model');

// async function httpAddLocation(req, res) {
//     const provinces = req.body.provinces
//     const location = {
//         locationId: '',
//         assembleId: '',
//         provinceName: '',
//     };
    
//     for (var i = 0; i < provinces.length; i++) {
//         location.assembleId = `E${(i % 9) + 1}`;
//         location.locationId = `A${i + 1}`;
//         location.provinceName = provinces[i];
//         createNewLocation(location);
//     }
        
//     return res.status(200).json({
//         ok: "ok",
//     });
// }

async function httpGetLocationByProvince(req, res) {
    const province = decodeURI(req.query.province);

    const location = await getLocationByProvince(province);

    return res.status(200).json(location);
}

async function httpGetLocationByFromLocation(req, res) {
    const fromLoc = req.params.id;
    const orderId = req.query.orderId;

    const order = await getOrderById(orderId);
    if (!order) {
        return res.status(404).json({
            error: "Order not found",
        })
    }

    const latestTransfer = await getLatestTransferByOrderId(order.orderId);
    if (!latestTransfer) {
        if (order.startLocation !== fromLoc) {
            return res.status(400).json({
                error: "Package not available at that location",
            });
        }
        const location = await getLocationById(fromLoc);
        return res.status(200).json({
            location: location.assembleId,
        })
    } else {
        if (latestTransfer.toLocation !== fromLoc) {
                return res.status(400).json({
                    error: "Package not available at that location",
                });
        } 
        const startLoc = await getLocationById(order.startLocation);
        const endLoc = await getLocationById(order.endLocation);
        if (fromLoc === startLoc.assembleId) {
            return res.status(200).json({
                location: endLoc.assembleId,
            });
        }
        if (fromLoc === endLoc.assembleId) {
            return res.status(200).json({
                location: endLoc.locationId,
            })
        }
        return res.status(400).json({
            error: "Invalid location",
        })
    }
}

module.exports = {
    httpGetLocationByFromLocation,
    httpGetLocationByProvince,
}