const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // User ID ko request object mein daal diya
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};