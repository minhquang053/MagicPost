const { 
    getAllUsers,
    getUserById,
    changeUserRoleById,
    createNewUser,
    deleteUserById,
} = require('../../models/users.model');

const {
    getAccountBasicInformation,
} = require('../../services/query');

async function httpGetAllUsers(req, res) {
    const userId = req.uid;
    const requestingUser = await getUserById(userId)
    // Filter users list based on the requesting user's role and work location
    const users = await getAllUsers(requestingUser.role, requestingUser.location);
    return res.status(200).json(users);
}

async function httpGetUserById(req, res) {
    const userId = Number(req.params.id);
    
    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }

    return res.status(200).json(user);
}

async function httpChangeUserRoleById(req, res) {
    const userId = req.uid;
    const newRole = req.body.newRole;
    const requestingUser = await getUserById(userId);
    if (requestingUser.role !== "Admin") {
        return res.status(401).json({
            error: "User role not changed"
        });
    }

    const changed = await changeUserRoleById(userId, newRole);
    if (!changed) {
        return res.status(500).json({
            error: 'User role not changed'
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

async function httpAddNewUser(req, res) {
    const user = req.body;
 
    // check for authentication and stuff
    try {
        await createNewUser(user);
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(201).json(user);
}

async function httpDeleteUserById(req, res) {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }

    const deleted = await deleteUserById(userId);
    if (!deleted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        });
    }

    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllUsers,
    httpGetUserById,
    httpChangeUserRoleById,
    httpAddNewUser,
    httpDeleteUserById,
};