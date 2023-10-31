const axios = require('axios');

const usersDatabase = require('./users.mongo');

async function getAllUsers() {
    return await usersDatabase
        .find()
        .sort()
        .skip()
        .limit()
};

async function getUserById(userId) {
    
}

async function changeUserRoleById(userId) {

}

async function createNewUser(user) {

}

async function deleteUserById(userId) {

}

module.exports = {
    getAllUsers,
    getUserById,
    changeUserRoleById,
    createNewUser,
    deleteUserById,
}