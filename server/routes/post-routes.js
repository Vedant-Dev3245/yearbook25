const router = require("express").Router();
const bodyParser = require("body-parser");
const {User, Search} = require("../models/user");
const multer = require("multer");
const path = require("path");
const transporter = require("../config/mail");
const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);
const privileged = require("../specialUsers")
const sharp = require("sharp");
const {log} = require("console");
const jwt = require("jsonwebtoken")
const middleware = require("./auth-middlewares");
const verifyToken = middleware.verifyToken
const getUserprofile = middleware.getUserprofile
const senderToken = middleware.senderToken
const authToken = middleware.authToken
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.clientID)


// do error handling before adding a new api


router.post("/auth", async (req, res) => {
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        requiredAudience: process.env.clientID
    })
    const payload = ticket.getPayload()

    const jwt_token = jwt.sign(
        {auth_token: payload.email},
        process.env.TOKEN_KEY,
    );
    return res.status(200).send({
        token: jwt_token,
    })
})


//adding a new user to db, adds simultaneously to 2 collections
router.post("/profile/add", authToken, async (req, res) => {
    try {
        const usr = await User.findOne({
            email: req.body.email
        });
        if (usr) {
            return res.send({
                msg: "User Exists Already"
            })
        } else {
            const user = new User({
                name: req.body.firstName + " " + req.body.lastName,
                email: req.body.email,
                bitsId: req.body.id,
                quote: req.body.quote,
                discipline: "",
                imageUrl: req.body.imgUrl,
                phone: req.body.phone,
                pEmail: req.body.pEmail
            })

            await user.save(async function (err, user) {
                const userId = user._id;
                const withoutQuotes = userId.toString().replace(/"/g, '');//removing """ from objectId thus generated
                console.log(userId);
                const search = new Search({
                    uId: withoutQuotes,
                    name: user.name,
                    bitsId: user.bitsId
                })
                await search.save();
                const token = jwt.sign(
                    {user: usr._id},
                    process.env.TOKEN_KEY,
                );
                return res.send({
                    detail: "Profile created",
                    _id: userId,
                    token: token
                })
            })


        }
    } catch (err) {
        console.log(err);
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time"
        })
    }
})


//checking if a profile exists earlier or not
router.post("/profile/check", authToken, async (req, res) => {
    try {
        // console.log(req.body)
        const email = req.body.email;
        // console.log(email[10]);
        if ((email[10] != 'p') || (email.substring(0, 5) != "f2019" && email.substring(0, 5) != "h2021" && !privileged.includes(email))) { //checking if a user is eligible to login, some special users are also mentioned in specialUsers.js file
            return res.send({
                authorised: 0,
            })
        }
        const usr = await User.findOne({
            email: email
        })

        //TODO:
        // usr -> usr.id
        // sign jwt token with user id and send the token in response
        if (usr) {
            const token = jwt.sign(
                {user: usr._id},
                process.env.TOKEN_KEY,
            );
            return res.send({
                authorised: 1,
                user: usr._id,
                token: token,
                exists: true
            })
        } else {
            return res.send({
                authorised: 1,
                user: {},
                exists: false
            })

        }
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
})

//nominating a new friend to write a caption, a mail goes via sendgrid 
router.post("/nominate", senderToken, async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const senderName = req.body.senderName;
        const receiverId = req.body.receiverId;
        const session = await User.startSession();
        session.startTransaction();
        const receiver = await User.findById(receiverId).session(session)
        const receiverEmail = receiver.email;
        if (receiver.nominatedby.some((e) => e.id === senderId)) {
            session.endSession();
            return res.send({
                status: "failure",
                msg: "User has already been nominated!"
            });
        } else {
            await receiver
                .updateOne({
                    $push: {
                        nominatedby: {
                            $each: [
                                {
                                    name: senderName,
                                    id: senderId,
                                },
                            ],
                        },
                    },
                }).session(session)
            await session.commitTransaction();
            session.endSession();
            const mailOptions = {
                from: "studentalumnirelationscell@gmail.com",
                to: receiverEmail,
                subject: "Online Yearbook Portal",
                // change the email test from here
                html: `<p>Greetings from the Student Alumni Relations Cell! <br>
                              You have been nominated by <b>${senderName}</b> to write a caption for their yearbook.<br>
                              Please keep the following points in mind while writing the captions:-<br>
                              <ol>
                             <li> There is a no-limit rule to the captions you can write about your friends! </li>
                             <li> You can modify the caption before the deadline through the notifications tab. </li>   
                             <li> Please refrain from using any expletives or Devanagari script while writing captions. </li>
                              </ol>
                              Login at yearbook.bits-sarc.org to enter the caption under the notifications tab  <br>
                              <br>
                              Regards,
                              Student Alumni Relations Cell! <br>
                               </p>`,
            };

            return res.send({
                status: "success",
                msg: "Friend nominated successfully!",
            });

            // sgMail.send(mailOptions)
            //     .then((response) => {
            //
            //         return res.send({
            //             status: "success",
            //             msg: "Friend nominated successfully!",
            //         });
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //         return res.send({
            //             status: "failure",
            //             msg: "There was an error, Please try after some time",
            //         });
            //     });
        }
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
})

// editing current details: only photo and quote
// router.post("/edit/:id", verifyToken, async (req, res) => {
//     try {
//         console.log(req.body);
//         const session = await User.startSession();
//         session.startTransaction();
//         const user = await User.findById(req.params.id);
//         const imgUrl = req.body.imgUrl
//         if (imgUrl != "") {
//             user.imageUrl = imgUrl
//         }
//         const quote = req.body.quote;
//         if (quote != "") {
//             user.quote = quote;
//         }
//         await user.save();
//         await session.commitTransaction();
//         session.endSession();
//         return res.send({
//             msg: "Successfully Updated"
//         })
//     } catch (err) {
//         return res.send({
//             status: "failure",
//             msg: "There was an error, Please try after some time"
//         })
//     }
// });


//writing caption 
router.post("/writecaption", senderToken, async (req, res) => {

    try {

        const caption = req.body.caption;
        const writerId = req.body.writerId;
        const receiverId = req.body.receiverId;
        // console.log(caption, writerId, receiverId);
        const session = await User.startSession();
        session.startTransaction();

        // const receiver = await User.findById(receiverId).session(session)
        // let temp = []
        // console.log(receiver.nominatedby)
        // receiver.nominatedby.forEach(x => temp.push(x.id))
        // console.log(temp)
        // console.log(writerId)
        // if (!temp.includes(writerId)) {
        //     session.endSession();
        //     return res.status(403).send({
        //         error: "You're not nominated to write the caption!"
        //     })
        // }

        const writer = await User.findById(writerId).session(session)
        let temp = []
        writer.nominatedby.forEach(x => temp.push(x.id))
        if (!temp.includes(receiverId)) {
            session.endSession()
            return res.status(403).send({
                error: "You're not nominated to write the caption!"
            })
        }

        if (caption === "") {
            session.endSession();
            return res.send({
                error: "Please enter a valid caption!",

            });
        } else {
            const writer = await User.findById(writerId).session(session);
            const name = writer.name;
            const receiver = await User.findById(receiverId).session(session);
            const captions = receiver.captions;
            //checking if a caption has already been written or not, then we'll update otherwise push a new one
            if (captions.find((o) => o.name === name)) {
                for (let i = 0; i < captions.length; i++) {
                    if (captions[i].name === name) {
                        captions[i].caption = caption;
                    }
                }
                await receiver
                    .updateOne({captions: captions})
                    .session(session);
                await session.commitTransaction();
                session.endSession();
                return res.send(
                    {success: "Succesfully Updated"}
                );
            } else {
                await receiver.updateOne({
                    $push: {
                        captions: {
                            $each: [
                                {
                                    name: name,
                                    caption: caption,
                                },
                            ],
                        },
                    },
                })
                    .session(session);
                await session.commitTransaction();
                session.endSession();
                return res.send(
                    {
                        success: "Succesfully Added"
                    }
                )
            }
        }
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time"
        })
    }

});

module.exports = router;
