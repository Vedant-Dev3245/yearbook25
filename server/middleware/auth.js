const jwt = require("jsonwebtoken");
const privileged = require("../specialUsers");

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.substring(7)
    if (!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ msg: "Invalid token" })
        }
        req.user = user;
        next();
    })
}

const isAdmin = (req, res, next) => {
    if (!privileged.contains(req.user.email)) {
        return res.status(401).json({ msg: "unauthorized" })
    }
    return next()
}

module.exports = { isAuthenticated, isAdmin };