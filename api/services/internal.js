const role_orders = ["Admin", "Manager", "Processor", "Shipper"];
const all_roles = ["Admin", "Manager", "Processor", "Shipper", undefined];
const all_locations = ["a1", "test", undefined];
const all_sendlocs = ["s1", "s2", "s3", "test", undefined];
const all_statuses = ["processing", "transferring", "shipping", "done", "failed", undefined];

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
    if (all_sendlocs.includes(order.sendLocation) &&
        all_statuses.includes(order.orderStatus)) {
        // the status can only be update forward, if there is something wrong with the order
        // just mark it as failed and return the goods.
        if (all_statuses.indexOf(order.newStatus) <= all_statuses.indexOf(order.orderStatus)
            || order.orderStatus === "done") {
            return false;
        }
        return true;
    }
    return false;
}

const hasAnyEmptyField = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const fieldValue = obj[key];

        if (typeof fieldValue === 'string' && fieldValue === '') {
          return true; // Return true if any string field is empty
        } else if (typeof fieldValue === 'object' && hasAnyEmptyField(fieldValue)) {
          return true; // Return true if any nested field is empty
        }
      }
    }
  }

  return false; // No empty fields found
};

module.exports = {
    lowerRolesThan,
    editRolePermissionGranted,
    validateUserInfo,
    validateOrderInfo,
    hasAnyEmptyField,
}