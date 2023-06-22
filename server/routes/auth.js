const router = require("express").Router();
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { User } = require("../models/user");


router.post("/auth", async (req, res) => {
    try {
        const { token } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            requiredAudience: process.env.AUDIENCE
        });

        // await User.create({ email: "f20220557@pilani.bits-pilani.ac.in", name: "HIMANSHU KUMAR", bitsId: "2022A8PS0557P", branchCode: ["A8"] })

        const payload = ticket.getPayload()
        const user = await User.findOne({ email: payload.email });

        const jwt_token = jwt.sign(
            {
                id: user.id,
                bitsId: user.bitsId,
                branchCode: user.branchCode,
                email: payload.email
            },
            process.env.TOKEN_KEY,
        );
        return res.status(200).send({
            token: jwt_token,
        })
    } catch (error) {
        return res.status(400).send({
            msg: "invalid token",
            error: error.message
        })
    }
})

module.exports = router;