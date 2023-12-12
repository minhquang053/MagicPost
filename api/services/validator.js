const validator = require('validator');

function isEmailValid(email) {
  return validator.isEmail(email);
}

function isVietnamesePhoneNumberValid(phoneNumber) {
  return validator.isMobilePhone(phoneNumber, 'vi-VN');
}

module.exports = {
    isEmailValid,
    isVietnamesePhoneNumberValid,
}