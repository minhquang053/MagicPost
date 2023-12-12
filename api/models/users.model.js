const User = require('./users.mongo');
const { getHashedPassword } = require('../services/bcrypt');

const DEFAULT_USER_ID = 0;

async function getAllUsers(role, location, searchTerm) {
    const roleRegex = new RegExp(role, 'i');
    const locRegex = new RegExp(location, 'i');
    const termRegex = new RegExp(searchTerm, 'i');
    return await User
        .find({ role: roleRegex, location: locRegex, $or: [
            { name: { $regex: termRegex } }, 
            { email: { $regex: termRegex} }
        ]})
};

async function getUserById(userId) {
    return await User
        .findOne({ userId: userId })
}

async function getUserByEmail(email) {
    return await User
        .findOne({ "email": email })
}

async function changeUserRoleById(userId, newRole) {
    const user = await getUserById(userId);
    if (!user) {
        return null;
    }
    user.role = newRole;
    user.save();
    return user;
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