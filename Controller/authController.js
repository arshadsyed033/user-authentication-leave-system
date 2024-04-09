const Employee = require('../Model/empModel');
const User = require('../Model/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
let refreshTokens = [];
const generateAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, jwtSecret, { expiresIn: '40s' }); // Increased token expiry time
}

const generateRefreshToken = (res, userId, role) => {
    const refreshToken = jwt.sign({ userId, role }, jwtSecret, { expiresIn: '5m' });
    setRefreshTokenCookie(res, refreshToken);
    refreshTokens.push(refreshToken); // Add refresh token to array
    return refreshToken;
}

const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000, 
    });
}

const loginEmp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emp = await Employee.findOne({ email });
        if (!emp) {
            return res.status(400).send('Email not found');
        }
        const matchPassword = await bcrypt.compare(password, emp.password);
        if (!matchPassword) {
            return res.status(400).send('Invalid Password');
        }
        const accessToken = generateAccessToken(emp._id, 'employee');
        const refreshToken1 = generateRefreshToken(res, emp._id, 'employee');
        res.json({ accessToken, refreshToken: refreshToken1 });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const refreshToken = async (req, res) => {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (!refreshTokenFromCookie) {
        return res.status(400).send('Refresh token not found in cookie');
    }

    if (!refreshTokens.includes(refreshTokenFromCookie)) {
        return res.status(403).send('Invalid refresh token');
    }

    jwt.verify(refreshTokenFromCookie, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(400).send(err);
        }
        const userId = decoded.userId;
        const accessToken = generateAccessToken(userId, 'employee');
        res.json({ accessToken });
    });
};

const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const usr = await User.findOne({ userEmail });
        if (!usr) {
            return res.status(400).send('Email not found!!');
        }
        const matchPassword = await bcrypt.compare(userPassword, usr.userPassword);
        if (!matchPassword) {
            return res.status(400).send('Invalid Password');
        }
        const accessToken = generateAccessToken(usr._id, 'user');
        const refreshToken1 = generateRefreshToken(res, usr._id, 'user');
        res.json({ accessToken, refreshToken: refreshToken1 });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    loginEmp,
    refreshToken,
    loginUser
}