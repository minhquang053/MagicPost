const { 
    getAllUsers,
    getUserById,
    changeUserProfile,
    createNewUser,
    deleteUserById,
} = require('../../models/users.model');
const bcrypt = require('bcrypt');

const { editRolePermissionGranted } = require('../../services/internal');
const { validateUserInfo } = require('../../services/internal');
const { isEmailValid, isVietnamesePhoneNumberValid } = require('../../services/validator');

async function httpGetAllUsers(req, res) {
    // to use query instead later
    const query = req.query;

    // Filter users list based on the requesting user's role and work location
    const users = await getAllUsers(query.role, query.location, query.searchTerm);
    
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

// async function httpChangeUserRoleById(req, res) {
//     const targetId = Number(req.params.id);
//     const targetUser = await getUserById(targetId);
//     const newRole = req.body.role;
//     targetUser.newRole = newRole;

//     if (!validateUserInfo({ role: newRole })) {
//         return res.status(400).json({
//             error: "Invalid role"
//         })
//     }

//     if (targetUser.role === targetUser.newRole) {
//         return res.status(400).json({
//             error: "New role is the same as before"
//         })
//     }

//     const requestingUser = await getUserById(req.uid);
//     if (!editRolePermissionGranted(requestingUser, targetUser)) {
//         return res.status(401).json({
//             error: "Permission required"
//         });
//     }

//     const user = await changeUserRoleById(targetId, newRole);
//     if (!user) {
//         return res.status(500).json({
//             error: 'User role not changed'
//         });
//     }

//     return res.status(200).json(user);
// }

async function httpChangeUserProfile(req, res) {
    const userProfile = req.body.user;
    const userId = req.uid;

    if (userProfile.newPassword) {
        const oldProfile = await getUserById(userId);
        try {
            const valid = await bcrypt.compare(userProfile.oldPassword, oldProfile.password)
            if (!valid) {
                return res.status(400).json({
                    error: 'Invalid old password'
                })
            }
        } catch (err) {
            return res.status(500).json({
                error: 'Something wrong happened',
            })
        }
    } 

    try {
        const user = await changeUserProfile(userId, userProfile);
        if (!user) {
            return res.status(500).json({
                error: 'Profile not changed'
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Profile not changed'
        })
    } 
    
    return res.status(200).json(userProfile);
}

async function httpAddNewUser(req, res) {
    const user = req.body;
 
    if (!validateUserInfo({ role: user.role, location: user.location })) {
        return res.status(400).json({
            error: "Invalid role or location"
        })
    }
    if (!isEmailValid(user.email)) {
        return res.status(400).json({
            error: "Invalid email"
        })
    }
    if (!isVietnamesePhoneNumberValid(user.phone)) {
        return res.status(400).json({
            error: "Invalid phone number"
        })
    }

    const requestingUser = await getUserById(req.uid);
    if (requestingUser.role !== "Admin" &&
        !(requestingUser.role == "Manager" &&
        requestingUser.location == user.location)) {
        return res.status(401).json({
            error: "Require administrator or location manager access"
        });
    }

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
    httpChangeUserProfile,
    httpAddNewUser,
    httpDeleteUserById,
};