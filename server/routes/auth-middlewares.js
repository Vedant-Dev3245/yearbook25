const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['accesstoken']
    if(!token) {
        return res.status(403).send("A JWT Token is required to access this endpoint ;)")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if(decoded.user == req.params.id) {
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
    if(!token) {
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
        return res.status(401).send("Invalid token!")
    }
}

exports.verifyToken = verifyToken;
exports.getUserprofile = getUserprofile;