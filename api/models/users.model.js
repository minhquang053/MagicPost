const User = require('./users.mongo');
const { getHashedPassword } = require('../services/bcrypt');

const DEFAULT_USER_ID = 0;

async function getAllUsers(role, location, searchTerm) {
    const roleRegex = new RegExp(role, 'i');
    const locRegex = new RegExp(location, 'i');
    const termRegex = new RegExp(searchTerm, 'i');
    if (role === '') {
        return await User.find({
            role: { $ne: 'Admin' }, // Exclude documents with the role 'Admin'
            location: locRegex,
            $or: [
                { name: { $regex: termRegex } },
                { email: { $regex: termRegex } }
            ]
        });
    }
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

// async function changeUserRoleById(userId, newRole) {
//     const user = await getUserById(userId);
//     if (!user) {
//         return null;
//     }
//     user.role = newRole;
//     user.save();
//     return user;
// }

async function changeUserProfile(userId, newProfile) {
    const user = await getUserById(userId);
    if (!user || !newProfile) {
        return null;
    }
    if (newProfile.avatar) {
        user.avatar = newProfile.avatar;
    } else if (newProfile.newPassword) {
        user.password = await getHashedPassword(newProfile.newPassword);
    } else {
        user.name = newProfile.name;
        user.email = newProfile.email;
        user.phone = newProfile.phone;
    }
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
        throw new Error(`Account with the same email existed`);
    }

    if (user.role === "Manager") {
        const manager = await User.findOne({ location: user.location, role: "Manager" });
        if (manager) {
            throw new Error('This location already had a Manager');
        }
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
    changeUserProfile,
    createNewUser,
    deleteUserById,
}