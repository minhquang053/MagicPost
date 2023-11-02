const jwt = require('jsonwebtoken');

const JWT_SECRET = "minhquang-khoinguyen-dothai"

function createAccessToken(userRole) {
    const accessToken = jwt.sign({
        iss: "magic-post-access",
        sub: userRole,
    }, JWT_SECRET, { expiresIn: '1h' });
    return accessToken;
}

function verifyAccessToken(token) {
    var decoded = jwt.verify(token, JWT_SECRET);
    try {
        if (decoded.iss === "magic-post-access") {
            return true
        } 
    } catch (err) {} 
    return false;
}

module.exports = {
    createAccessToken,
}