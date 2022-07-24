const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const transporter = require("../config/mail");
const keys = require("../config/keys");
var fs = require("fs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);
const privileged=require("../specialUsers")
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


router.post("/profile/add", upload.single("image"),async (req, res) => {
    try {
        const user = new User({
            name: req.body.firstName + " " + req.body.lastName,
            email: req.body.email,
            bitsId: req.body.bitsId,
            quote: req.body.quote,
            discipline: ""
        })
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        user.img = buffer
        await user.save()
        return res.send({
            detail: "Profile created"
        })

    } catch (err) {
        return res.send({
            detail: "Something went wrong" + err
        })
    }
})


    // const form = new formidable.IncomingForm();
    // console.log(req)
    // const form = formidable({multiples: true})
    // form.parse(req, async (err, fields, files) => {
    //     try {
    //         console.log(fields)receiver
    //     }
    // })


router.post("/profile/check", async (req, res) => { 

    console.log(req.body)
    const email = req.body.email;
    if (email.substring(0, 5) != "f2019" && !privileged.includes(email)) {
        return res.send({
            authorised: 0
       })
   }

    const usr = await User.findOne({
        email: email
    })
    if (usr) {
        res.send({
            authorised: 1,
            user: usr,
            exists: true
        })
    } else {
        res.send({
            authorised: 1,
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

router.post("/nominate", async (req, res) => {
    const senderId = req.body.senderId;
    const senderName = req.body.senderName;
    const receiverId = req.body.receiverId;
    const session = await User.startSession();
    session.startTransaction();
    const receiver = await User.findOne({ _id: receiverId }).session(session)
    const receiverEmail = receiver.email;
    // console.log(receiver)
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
            html: `<p>Greetings from the Student Alumni Relations Cell! <br>
                              You have been nominated by <b>${senderName}</b> to write a caption for their yearbook.<br>
                              Please keep the following points in mind while writing the captions:-<br>
                              <ol>
                             <li> There is a no-limit rule to the captions you can write about your friends! </li>
                             <li> You can modify the caption before the deadline through the notifications tab. </li>   
                             <li> Please refrain from using any expletives or Devanagari script while writing captions. </li>
                              </ol>
                              Login at yearbook.bits-sarc.org to enter the caption under the notifications tab  <br>
                             
                              PS: If you have any further queries or you wish to contribute to the yearbook in the form of pictures from campus, you may do the same via this form : https://forms.gle/bbrjoVVt6kdroFbs5
                              <br><br>
                              Regards,
                              Student Alumni Relations Cell! <br>
                               </p>`,
        };
        sgMail.send(mailOptions)
            .then((response) => {
            
                return res.send({
                    status:"success",
                    msg: "Friend nominated successfully!",
                });
            })
            .catch((error) => {
                session.endSession();
                console.error(error);
                return res.send({
                    status:"failure",
                    msg: "There was an error, Please try after some time",
                });
            });
    }
})


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


module.exports = router;
