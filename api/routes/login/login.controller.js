const bcrypt = require('bcrypt');

const { getUserByEmail } = require('../../models/users.model');
const { createAccessToken } = require('../../services/jwt');

// to replace with environment variable later

async function httpLogin(req, res) {
    const login = req.body;
    const user = await getUserByEmail(login.email);
    bcrypt.compare(login.password, user.password)
    .then(async valid => {
        if (valid) {
            return res.status(200).json({
                token: createAccessToken(user.userId),
            });
        } else {
            return res.status(400).json({
                error: "Invalid user"
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: "Couldn't validate user"
        })
    });
}

module.exports = {
    httpLogin,
}