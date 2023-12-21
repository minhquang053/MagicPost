const Location = require('./locations.mongo');

async function getLocationByProvince(province) {
    const provinceRegex = new RegExp(province, 'i');
    return Location
        .findOne({ provinceName: provinceRegex }) 
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