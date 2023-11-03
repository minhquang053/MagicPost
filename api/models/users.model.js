const axios = require('axios');

const User = require('./users.mongo');
const { getHashedPassword } = require('../services/bcrypt');

const DEFAULT_USER_ID = 0;

async function getAllUsers(role, location) {
    const all_roles = ['Admin', 'Manager', 'Clerk', 'Shipper'];
    const find_roles = all_roles.slice(all_roles.indexOf(role));
    return await User
        .find({ role: { $in: find_roles }, location: location })
        .select({ _id: 0, userId: 1, name: 1, role: 1});
};

async function getUserById(userId) {
    return await User
        .findOne({ userId: userId })
        .select({ _id: 0, userId: 1, name: 1, email: 1, role: 1, location: 1 });
}

async function getUserByEmail(email) {
    return await User.findOne({ "email": email })
        .select({ _id: 0, userId: 1, name: 1, email: 1, role: 1, location: 1});
}

async function changeUserRoleById(userId, newRole) {
    return await User.updateOne({ userId: userId }, { role: newRole });
}

async function getLatestUserId() {
    const latestUser = await User
        .findOne()
        .sort('-userId');
    if (!latestUser) {
        return DEFAULT_USER_ID;
    }

    return latestUser.userId;
}

async function saveUser(user) {
    await User.create(user);
}

async function createNewUser(user) {
    const existedUser = await User.findOne({ 'email': `${user.email}` });
    if (existedUser) {
        throw new Error(`The email ${existedUser.email} has already been used for other account`);
    }
    const newUserId = await getLatestUserId() + 1; 
    const newUser = Object.assign(user, {
        userId: newUserId,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        password: await getHashedPassword(user.password),
    })
    await saveUser(newUser);
}

async function deleteUserById(userId) {

}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    changeUserRoleById,
    createNewUser,
    deleteUserById,
}