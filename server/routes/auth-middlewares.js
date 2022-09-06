const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['accessToken']

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

module.exports = verifyToken;