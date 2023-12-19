const Location = require('./locations.mongo');

async function getLocationByProvince(province) {
    return Location
        .findOne({ provinceName: province }) 
};

async function getLocationById(locId) {
    return Location
        .findOne({ locationId: locId})
}

// async function createNewLocation(location) {
//     const newLocation = Object.assign(location, {
//         locationId: location.locationId,
//         assembleId: location.assembleId,
//         provinceName: location.provinceName,
//     })
//     await saveLocation(newLocation);
// }

// async function saveLocation(location) {
//     await Location.create(location);
// }

module.exports = {
    getLocationById,
    getLocationByProvince
}