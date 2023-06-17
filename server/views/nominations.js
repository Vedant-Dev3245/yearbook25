const { User, Search } = require("../models/user");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);

const sendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const targetId = req.body.targetId;

        const sender = await User.findById(senderId);
        const target = await User.findById(targetId);

        if (
            target.requests.includes(senderId) ||
            target.declined_requests.includes(senderId)
        ) {
            return res.send({
                status: "failure",
                msg: "You have already sent a request to this user",
            });
        }

        target.requests.push(senderId);

        const mailOptions = {
            from: "studentalumnirelationscell@gmail.com",
            to: receiverEmail,
            subject: "Online Yearbook Portal",
            // change the email test from here
            html: `<p>Greetings from the Student Alumni Relations Cell! <br>
                          ${sender.name} has requested to write on your yearbook wall! <br>
                          <br>
                          Log on to the <a href="yearbook.bits-sarc.org">yearbook portal</a> to accept their request. <br>
                          <br>
                          Regards,
                          Student Alumni Relations Cell! <br>
                           </p>`,
        };

        // TODO:
        // Send mail

        return res.send({
            status: "success",
            msg: "Request sent successfully!",
        });
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
}

const allRequests = async (req, res) => {
    try {
        senderId = req.user.id;
        sender = await User.findById(senderId).populate("requests").populate("declined_requests");

        return res.send({
            status: "success",
            requests: sender.requests,
            declined_requests: sender.declined_requests,
        })
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
};

const nominateUser = async (req, res) => {
    try {
        const senderId = req.user.Id;
        const receiverId = req.body.receiverId;

        const session = await User.startSession();
        session.startTransaction();

        const receiver = await User.findById(receiverId).session(session);
        const sender = await User.findById(senderId).session(session);
        const senderName = sender.name;

        const receiverEmail = receiver.email;
        if (receiver.nominatedby.some((obj) => obj.id === senderId)) {
            
            session.endSession();
            return res.send({
                status: "failure",
                msg: "User has already been nominated!",
            });

        }
        
        if (receiverId == senderId) {

            return res.send({
                status: "failure",
                msg: "You can't nominate yourself",
            });
            
        }

        // Handle requests
        // if the target user was had requested to write on the wall
        // remove request and add it to nominated
        if (sender.requests.includes(receiver)) {
            sender.requests.remove(receiver);
        } else if (sender.declined_requests.includes(receiver)) {
            sender.declined_requests.remove(receiver);
        }
        
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
            })
            .session(session);
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
        
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
};

const declineRequest = async (req, res) => {
    try {
        senderId = req.user.id;
        receiverId = req.body.receiverId;

        sender = await User.findById(senderId);
        receiver = await User.findById(receiverId);

        sender.requests.remove(reciever);
        sender.declined_requests.push(reciever);

        return res.send({
            success: "Succesfully declined",
        });
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
}

module.exports = { allRequests, nominateUser, declineRequest, sendRequest }