const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const authController = require('../Controller/authController')
const { refreshTokens } = require('../Controller/authController')
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            // Access token expired or invalid, try refreshing with the refresh token
            const refreshTokenFromCookie = req.cookies.refreshToken;
            // console.log(req.cookies.refreshToken)
            if (!refreshTokenFromCookie) {
                return res.sendStatus(403); // No refresh token provided in cookie
            }

            // Verify refresh token
            if (!refreshTokens || !refreshTokens.includes(refreshTokenFromCookie)) {
                return res.sendStatus(403); // Invalid refresh token
            }
            
            jwt.verify(refreshTokenFromCookie, jwtSecret, (err, decoded) => {
                if (err) {
                    return res.sendStatus(403); // Refresh token expired or invalid
                }
                const userId = decoded.userId;
                const accessToken = generateAccessToken(userId, 'employee');
                req.user = user;
                req.accessToken = accessToken;
                next();
            });
        } else {
            // Access token is valid
            req.user = user;
            next();
        }
    });
};

module.exports = {
    authenticateToken
};