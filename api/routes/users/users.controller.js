const { 
    getAllUsers,
    getUserById,
    changeUserProfile,
    createNewUser,
    deleteUserById,
    getUserByEmail,
} = require('../../models/users.model');
const bcrypt = require('bcrypt');

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

async function httpChangeUserProfile(req, res) {
    const userProfile = req.body.user;
    const userId = req.uid;

    const oldProfile = await getUserById(userId);
    if ((oldProfile.email === 'manager@gmail.com' || oldProfile.email === 'transactor@gmail.com' || oldProfile.email === 'processor@gmail.com')
        && !userProfile.avatar) {
        return res.status(400).json({
            error: "Can't modify tester account"
        }); 
    }

    if (userProfile.email) {
        if (!isEmailValid(userProfile.email)) {
            return res.status(400).json({
                error: "Invalid email"
            })
        }
        const matchedEmail = await getUserByEmail(userProfile.email);
        if (matchedEmail && userProfile.email !== oldProfile.email) {
            return res.status(400).json({
                error: "Email already existed"
            })
        }
        if (!isVietnamesePhoneNumberValid(userProfile.phone)) {
        return res.status(400).json({
            error: "Invalid phone number"
        })
    }
    }

    if (userProfile.newPassword) {
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
        console.log(user.location);
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