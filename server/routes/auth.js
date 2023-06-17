const router = require("express").Router();
const jwt = require("jsonwebtoken")
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


router.post("/auth", async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        requiredAudience: process.env.AUDIENCE
    });

    // get more info from the database then go ahead add branch and all to the payload

    const payload = ticket.getPayload()
    const jwt_token = jwt.sign(
        { email: payload.email },
        process.env.TOKEN_KEY,
    );
    return res.status(200).send({
        token: jwt_token,
    })
})

module.exports = router;