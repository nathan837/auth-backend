// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token, auth denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
