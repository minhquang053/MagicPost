const { v4: uuidv4 } = require('uuid');

function generateOrderId() {
  // Generate a UUID
  const uuid = uuidv4();

  // Convert the UUID to a hexadecimal string
  const hexString = uuid.replace(/-/g, '');

  // Take the first 9 characters from the hexadecimal string
  const shortHexString = hexString.substring(0, 9);

  // Convert the hexadecimal string to a decimal number
  const orderID = parseInt(shortHexString, 16);

  return `MP${orderID.toString()}VN`; // Convert the number to a string
}

function generateTransferId() {
  return uuidv4();
}

module.exports = {
  generateOrderId,
  generateTransferId,
}