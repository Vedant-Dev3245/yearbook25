const router = require("express").Router();
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { User } = require("../models/user");


router.post("/auth", async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        requiredAudience: process.env.AUDIENCE
    });

    const payload = ticket.getPayload()
    const user = await User.find({ email: payload.email });

    const jwt_token = jwt.sign(
        { id: user.id, bitsId: user.bitsId, branchCode: user.branchCode, email: payload.email },
        process.env.TOKEN_KEY,
    );
    return res.status(200).send({
        token: jwt_token,
    })
})

module.exports = router;