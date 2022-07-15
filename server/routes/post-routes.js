const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const transporter = require("../config/mail");
const keys = require("../config/keys");
const users = require("../users");
var fs = require("fs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);
const sharp = require("sharp");
const upload = multer({
    limits: {
        fileSize: 3000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|JPEG|PNG)$/)) {
            return cb(
                new Error("Please provide a jpg, jpeg or png file")
            );
        }
        cb(undefined, true);
    },
});


router.post("/profile/add", async (req, res) => {
    const existing_usr = await User.findOne({email: req.body.formData.email})
    console.log(req.body)
    console.log(existing_usr)
    if (!existing_usr) {
        try {
            const formData = req.body.formData
            const imgData = req.body.img
            const usr = new User({
                name: formData.firstName + ' ' + formData.lastName,
                email: formData.email,
                bitsId: formData.id,
                quote: formData.quote,
                discipline: "",
                img: imgData,
            })

            await usr.save()

            return res.send({
                status: 200,
                details: "User profile created"
            })
        } catch (err) {
            return res.send({
                status: 500,
                details: "Something went wrong while creating or saving user object"
            })
        }
    }
})


router.post("/profile/check", async (req, res) => {
    // dummy req data = {
    //             name: formData.firstName + ' '+ formData.lastName,
    //             email: formData.email,
    //             bitsId: formData.id,
    //             quote: formData.quote,
    //             discipline: "",
    //             img: imgData,
    //             }

    const usr = await User.findOne({
        email: req.body.email
    })
    if (usr) {
        res.send({
            user: usr,
            exists: true
        })
    } else {
        res.send( {
            user: {},
            exists: false
        })
    }
})


router.post("/addid/:id", async (req, res) => {
    const id = req.params.id;
    const quote = req.body.user.quote;
    if (req.user.id === id) {
        await User.findByIdAndUpdate(id, {quote: quote});
    }
    return res.redirect("/profile/" + req.params.id);
});

router.post("/nominate/:id", async (req, res) => {
    const id = req.params.id;
    const nomineeid = req.body.user.nominee.toUpperCase();
    const session = await User.startSession();
    session.startTransaction();
    const user1 = await User.findById(id).session(session);
    const nominatorid = user1.id;
    const name = user1.name;
    const user2 = await User.findOne({bitsId: nomineeid}).session(session);
    if (id === req.user.id) {
        if (user2) {
            if (user2.id === user1.id) {
                session.endSession();
                console.log("nononono");
                // return res.render("nominate", {
                //       id: id,
                //       error: "You cannot nominate yourself!",
                // });
                return res.send({
                    id: id,
                    error: "You cannot nominate yourself!",
                });
            } else if (
                user2.nominatedby.some((e) => e.id === nominatorid)
            ) {
                session.endSession();
                // return res.render("nominate", {
                //       id: id,
                //       success: "User has already been nominated!",
                // });
                return res.send({
                    id: id,
                    success: "User has already been nominated!",
                });
            } else {
                const email = user2.email;
                await user2
                    .updateOne({
                        $push: {
                            nominatedby: {
                                $each: [
                                    {
                                        name: name,
                                        id: nominatorid,
                                    },
                                ],
                            },
                        },
                    })
                    .session(session);
                await session.commitTransaction();
                session.endSession();
                const mailOptions = {
                    from: "studentalumnirelationscell@gmail.com",
                    to: email,
                    subject: "Online Yearbook Portal",
                    html: `<p>Greetings from the Student Alumni Relations Cell! <br>
                              You have been nominated by <b>${name}</b> to write a caption for their yearbook.<br>
                              Please keep the following points in mind while writing the captions:-<br>
                              <ol>
                             <li> There is a no-limit rule to the captions you can write about your friends! </li>
                             <li> You can modify the caption before the deadline through the notifications tab. </li>   
                             <li> Please refrain from using any expletives or Devanagari script while writing captions. </li>
                              </ol>
                              Login at yearbook.bits-sarc.org to enter the caption under the notifications tab  <br>
                             
                              PS: If you have any further queries or you wish to contribute to the yearbook in the form of pictures from campus, you may do the same via this form : https://forms.gle/bbrjoVVt6kdroFbs5
<<<<<<< HEAD
      
=======
                              <br><br>
                              Regards,
                              Student Alumni Relations Cell! <br>
>>>>>>> 781b259903d5aeab6ee8ec2fc941e7d37dc2a32c
                               </p>`,
                };
                sgMail.send(mailOptions)
                    .then((response) => {
                        console.log(response[0].statusCode);
                        console.log(response[0].headers);
                        return res.send({
                            id: id,
                            success: "Friend nominated successfully!",
                        });
                        // return res.render("nominate", {
                        //       id: id,
                        //       success: "Friend nominated successfully!",
                        // });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            // return res.render("nominate", {
            //       id: id,
            //       error: "User doesn't exist. Please ask them to login first",
            // });
            return res.send({
                id: id,
                error: "User doesn't exist. Please ask them to login first",
            });
        }
    }
});

router.post("/edit/:id", upload.single("image"), async (req, res) => {
    const user = await User.findById(req.params.id);
    if (req.file != null) {
        const buffer = await sharp(req.file.buffer)
            .png()
            .toBuffer();
        user.img = buffer;
        await user.save();
    }
    const id = req.params.id;
    let disc = req.body.user.disc;
    let quote = req.body.user.quote;

    const session = await User.startSession();
    session.startTransaction();
    if (req.user.id === id) {
        if (disc === "") disc = user.discipline;
        else disc = req.body.user.disc;
        if (quote === "") quote = user.quote;
        else quote = req.body.user.quote;
        await User.findByIdAndUpdate(id, {
            discipline: disc,
            quote: quote,
        }).session(session);
        await session.commitTransaction();
        session.endSession();
        res.redirect("/profile/" + req.user.id);
    }
});

router.post("/:id1/:id2/caption", async (req, res) => {
    const caption = req.body.user.caption;
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    const session = await User.startSession();
    session.startTransaction();
    if (req.user.id === id1) {
        if (caption === "") {
            session.endSession();
            // return res.render("caption", {
            //       id: id1,
            //       id2: id2,
            //       name: user2.name,
            //       error: "Please enter a valid caption!",
            //       oldcaption: "",
            // });
            return res.send({
                id: id1,
                id2: id2,
                name: user2.name,
                error: "Please enter a valid caption!",
                oldcaption: "",
            });
        } else {
            const user1 = await User.findById(id1).session(session);
            const name = user1.name;
            const user2 = await User.findById(id2).session(session);
            const captions = user2.captions;
            const nominatedList = user1.nominatedby;
            if (nominatedList.find((item) => item.id === user2.id)) {
                if (captions.find((o) => o.name === name)) {
                    for (let i = 0; i < captions.length; i++) {
                        if (captions[i].name === name) {
                            captions[i].caption = caption;
                        }
                    }
                    await user2
                        .updateOne({captions: captions})
                        .session(session);
                    await session.commitTransaction();
                    session.endSession();
                    return res.redirect(
                        "/" + user1.id + "/search/" + user2.bitsId
                    );
                } else {
                    await user2
                        .updateOne({
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
                    return res.redirect(
                        "/" + user1.id + "/search/" + user2.bitsId
                    );
                }
            } else {
                console.log(user1.bitsId + "   " + user2.bitsId);
                session.endSession();
                // return res.render("caption", {
                //       id: id1,
                //       id2: id2,
                //       name: user2.name,
                //       error: "There was an error!",
                //       oldcaption: "",
                // });
                return res.send("caption", {
                    id: id1,
                    id2: id2,
                    name: user2.name,
                    error: "There was an error!",
                    oldcaption: "",
                });
            }
        }
    } else {
        return res.redirect("/profile/" + req.user.id);
    }
});

router.post("/:id/search", async (req, res) => {
    const id = req.params.id;
    const searched_val = req.body.user.searched_val.toUpperCase();
    console.log(searched_val);
    if (searched_val.charAt(0) === "2") {
        console.log("gr8");
        const userbyBitsId = await User.findOne({bitsId: searched_val});
        if (userbyBitsId)
            return res.redirect("/" + id + "/search/" + searched_val);
        else {
            let user = await User.findById(id);
            // return res.render("profile", {
            //       user: user,
            //       msg: "User not found!",
            // });
            return res.send({
                user: user,
                msg: "User not found!",
            });
        }
    } else {
        const userbyName = await User.findOne({
            $text: {$search: searched_val},
        });
        if (userbyName)
            return res.redirect("/" + id + "/search/" + searched_val);
        else {
            let user = await User.findById(id);
            // return res.render("profile", {
            //       user: user,
            //       msg: "User not found!",
            // });
            return res.send({
                user: user,
                msg: "User not found!",
            });
        }
    }
});

module.exports = router;
