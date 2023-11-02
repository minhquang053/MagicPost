const { verifyAccessToken } = require('../services/jwt');

function validateUser(req, res, next) {
    const accessToken = req.headers.authorization;

    if (verifyAccessToken(accessToken)) {
        next()
    } else {
        return res.status(403).json({
            error: "Unauthenticated user"
        })
    } 
}

module.exports = {
    validateUser
}