const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) {
        return res.status(403).send({ message: "No token provided." });
    }

    // Verify token
    jwt.verify(token.split(' ')[1], 'hgjgjhkjkjvjvhbj', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized access. Invalid token." });
        }
        req.userId = decoded.userId; 
        next();
    });
};

module.exports = verifyToken;
