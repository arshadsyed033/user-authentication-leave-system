module.exports = {
    development: {
        jwtSecret: '855st445A',
    },
    production: {
        jwtSecret: process.env.JWT_SECRET,
    }
};
