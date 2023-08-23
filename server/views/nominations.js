const { User, Search } = require("../models/user");
const Filter = require("bad-words");
const words = require("../bad-words.json");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID);

const sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const targetId = req.body.targetId;
    var caption = req.body.caption;

    const sender = await User.findById(senderId);
    const target = await User.findById(targetId);

    const filter = new Filter({ placeHolder: "x" });
    filter.addWords(...words);
    caption = filter.clean(caption);

    if (
      target.requests.find((o) => o.user == senderId) ||
      target.declined_requests.find((o) => o.user == senderId) ||
      target.nominatedby.find((o) => o.user == senderId)
    ) {
      return res.send({
        status: "failure",
        msg: "You have already sent a request to this user",
      });
    }

    await target.updateOne({
      $push: {
        requests: {
          $each: [
            {
              user: senderId,
              caption: caption,
            },
          ],
        },
      },
    });

    const mailOptions = {
      from: "studentalumnirelationscell@gmail.com",
      to: "receiverEmail",
      subject: "Online Yearbook Portal",
      // change the email test from here
      html: `<p>Greetings from the Student Alumni Relations Cell! <br>
                          ${sender.name} has requested to write on your yearbook wall! <br>
                          <br>
                          Log on to the <a href="yearbook.bits-sarc.in">yearbook portal</a> to accept their request. <br>
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
    console.log(err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const allRequests = async (req, res) => {
  try {
    senderId = req.user.id;
    sender = await User.findById(senderId)
      .populate("requests.user", "name id")
      .populate("declined_requests", "name id");

    return res.send({
      status: "success",
      requests: sender.requests,
      declined_requests: sender.declined_requests,
    });
  } catch (err) {
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const nominateUser = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;

    const session = await User.startSession();
    session.startTransaction();

    const receiver = await User.findById(receiverId).session(session);
    const sender = await User.findById(senderId).session(session);
    const senderName = sender.name;

    const receiverEmail = receiver.email;
    if (receiver.nominatedby.find((obj) => obj.id == senderId)) {
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
    // if the target user had requested to write on the wall
    // remove request and add it to nominated
    if (sender.requests.find((o) => o.user == receiverId)) {
      const requests = sender.requests;
      let newCap;
      for (let i = 0; i < requests.length; i++) {
        if (requests[i].user == receiverId) {
          newCap = requests[i].caption;
          const filter = new Filter({ placeHolder: "x" });
          filter.addWords(...words);
          newCap = filter.clean(newCap);
          requests.splice(i, 1);
        }
      }
      await sender
        .updateOne({
          $push: {
            captions: {
              $each: [
                {
                  user: receiver,
                  caption: newCap,
                },
              ],
            },
          },
        })
        .session(session);
      await sender.updateOne({ requests }).session(session);
    } else if (sender.declined_requests.find((o) => o.user == receiverId)) {
      const declined_requests = sender.declined_requests;
      let newCap;
      for (let i = 0; i < declined_requests.length; i++) {
        if (declined_requests[i].user === receiverId) {
          newCap = declined_requests[i].caption;
          declined_requests.splice(i, 1);
        }
      }
      await sender
        .updateOne({
          $push: {
            captions: {
              $each: [
                {
                  user: receiver,
                  caption: newCap,
                },
              ],
            },
          },
        })
        .session(session);
      await sender.updateOne({ declined_requests }).session(session);
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
                            Login at yearbook.bits-sarc.in to enter the caption under the notifications tab  <br>
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
      msg: err.message,
    });
  }
};

const declineRequest = async (req, res) => {
  try {
    senderId = req.user.id;
    receiverId = req.body.receiverId;

    sender = await User.findById(senderId);
    receiver = await User.findById(receiverId);

    const requests = sender.requests;
    let newCap;
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].user === receiver) {
        newCap = requests[i].caption;
        requests.splice(i, 1);
      }
    }
    await receiver
      .updateOne({
        $push: {
          declined_requests: {
            $each: [
              {
                user: receiver,
                caption: newCap,
              },
            ],
          },
        },
      })
      .session(session);
    await sender.updateOne({ requests }).session(session);

    return res.send({
      success: "Succesfully declined",
    });
  } catch (err) {
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

module.exports = { allRequests, nominateUser, declineRequest, sendRequest };
