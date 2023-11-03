const role_orders = ["Admin", "Manager", "Clerk", "Shipper"];
const all_roles = ["Admin", "Manager", "Clerk", "Shipper", undefined];
const all_locations = ["a1", undefined];

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

module.exports = {
    lowerRolesThan,
    editRolePermissionGranted,
};

/*
Check if any of the fixed information is correct
If an information is leftout of the function, they will be treated as undefined
*/
function validateInfo(user) {
    if (all_roles.includes(user.role) &&
        all_locations.includes(user.location)) {
        return true;
    }
    return false;
}

module.exports = {
    lowerRolesThan,
    editRolePermissionGranted,
    validateInfo,
}