
const jwtTokenVerify = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    const token = req.cookies?.jwtToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        });
    }

    try {
        const decoded = jwtTokenVerify.verify(token, process.env.JWT_SECRET);
        // console.log("decode", decoded);
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = isAuth;