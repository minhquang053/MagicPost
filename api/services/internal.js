const role_orders = ["Admin", "Manager", "Processor", "Shipper"];
const all_roles = ["Admin", "Manager", "Processor", "Shipper", undefined];
const all_locations = ["a1", undefined];
const all_sendlocs = ["s1", "s2", "s3", undefined];

function lowerRolesThan(role) {
    const lowerRoles = role_orders.slice(role_orders.indexOf(role) + 1);
    return lowerRoles;
}

function editRolePermissionGranted(reqUser, targetUser) {
    if (targetUser.role === "Admin" || targetUser.newRole === "Admin") return false;
    if (reqUser.role === "Admin" ||
        (reqUser.role === "Manager" && 
        lowerRolesThan(reqUser.role).includes(targetUser.role) &&
        lowerRolesThan(reqUser.role).includes(targetUser.newRole) &&
        reqUser.location === targetUser.location)) 
        return true;
    return false;
}

/*
Check if any of the fixed information is correct
If an information is leftout of the function, they will be treated as undefined
*/
function validateUserInfo(user) {
    if (all_roles.includes(user.role) &&
        all_locations.includes(user.location)) {
        return true;
    }
    return false;
}

function validateOrderInfo(order) {
    if (all_sendlocs.includes(order.sendLocation)) {
        return true;
    }
    return false;
}

/*
Find cost-effective to transfer an order from the send location 
to the assemble locations
*/
function findTransferPath(order) {
    // add finding logic if there are middle points between send and receive location

    return [order.sendLocation, order.receiveLocation, "finloc"];
}

module.exports = {
    lowerRolesThan,
    editRolePermissionGranted,
    validateUserInfo,
    validateOrderInfo,
    findTransferPath
}