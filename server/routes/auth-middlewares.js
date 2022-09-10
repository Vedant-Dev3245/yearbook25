const jwt = require("jsonwebtoken");
const config = process.env;

const authToken = (req, res, next) => {
    const token = req.headers['authtoken']
    if (!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (decoded.auth_token == req.body.email) {
                next();
            } else {
                return res.status(403).send("You are not authorized!")
            }
        })
    } catch (err) {
        return res.status(401).send("Invalid token!")
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers['accesstoken']
    if (!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (decoded.user == req.params.id) {
                next();
            } else {
                return res.status(403).send("You are not authorized!")
            }
        })
    } catch (err) {
        return res.status(401).send("Invalid token!")
    }
}

const getUserprofile = (req, res, next) => {
    const token = req.headers['accesstoken']
    if (!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (decoded.user == req.params.id) {
                res.locals.is_user = true
                next()
            } else {
                res.locals.is_user = false
                next()
            }
        })
    } catch (err) {
        return res.status(401).send(
            {auth_token: payload.email},
            process.env.TOKEN_KEY,
        );
        return res.status(200).send("Invalid token!")
    }
}

const senderToken = (req, res, next) => {
    const token = req.headers['accesstoken']
    if (!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (decoded.user == (req.body.senderId || req.body.writerId)) {
                next()
            } else {
                return res.status(403).send("You are not authorized!")
            }
        })
    } catch (err) {
        return res.status(401).send("Invalid token!")
    }
}

exports.verifyToken = verifyToken;
exports.getUserprofile = getUserprofile;
exports.senderToken = senderToken;
exports.authToken = authToken;