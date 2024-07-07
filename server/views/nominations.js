const { User } = require("../models/user");
const Filter = require("bad-words");
const words = require("../bad-words.json");
const { request } = require("express");
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID);

const sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const targetId = req.body.targetId;

    var caption = req.body.caption;

    if (senderId == targetId) {
      return res.send({
        status: "failure",
        msg: "You can't write for yourself",
      });
    }

    const session = User.transaction();

    const sender = await User.findByPk(senderId);
    const target = await User.findByPk(targetId);

    const filter = new Filter({ placeHolder: "x" });
    filter.addWords(...words);
    caption = filter.clean(caption);

    if (
      target.requests.find((o) => o.user == senderId) ||
      target.declined_requests.find((o) => o.user == senderId) ||
      target.nominatedby.find((o) => o.user == senderId)
    ) {
      await session.rollback();
      console.log("Request has already been sent by" + senderId + " to " + targetId);
      return res.status(500).send({
        status: "failure",
        msg: "You have already sent a request to this user",
      });
    }

    // Check if array methods need to be changed to Raw SQL Queries
    await target.requests.push({"user": senderId, "caption": caption});
    target.save({transaction: session});

    session.commit();

    // !!! IS THIS deprecated? 
    // // TODO:
    // // Send mail
    // const mailOptions = {
    //   from: "studentalumnirelationscell@gmail.com",
    //   to: "receiverEmail",
    //   subject: "Online Yearbook Portal",
    //   // change the email test from here
    //   html: `<p>Greetings from the Student Alumni Relations Cell! <br>
    //                       ${sender.name} has requested to write on your yearbook wall! <br>
    //                       <br>
    //                       Log on to the <a href="yearbook.bits-sarc.in">yearbook portal</a> to accept their request. <br>
    //                       <br>
    //                       Regards,
    //                       Student Alumni Relations Cell! <br>
    //                        </p>`,
    // };

    return res.send({
      status: "success",
      msg: "Request sent successfully!",
    });

  } catch (err) {
    console.log("There was an erorr: ", err);

    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const allRequests = async (req, res) => {
  try {
    const senderId = req.user.id;
    const sender = await User.findByPk(senderId)

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

    const session = await User.transaction();
  
    const receiver = await User.findByPk(receiverId, {transaction: session});
    const sender = await User.findByPk(senderId, {transaction: session});

    const senderName = sender.name;
    const receiverEmail = receiver.email;

    if (receiver.nominatedby.find((obj) => obj.id == senderId)) {
      session.rollback();
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
      try{

        sender.captions.push({"user": receiver, "caption": newCap});
        sender.requests = requests;

        await sender.save({transaction: session});

      }catch(err){
        console.log("Some error occured ", err);
        session.rollback();
        return res.status(500).send({"message": "An error occured"});
      }

    } else if (sender.declined_requests.find((o) => o.user == receiverId)) {
      const declined_requests = sender.declined_requests;
      let newCap;
      for (let i = 0; i < declined_requests.length; i++) {
        if (declined_requests[i].user === receiverId) {
          newCap = declined_requests[i].caption;

          const filter = new Filter({ placeHolder: "x" });
          filter.addWords(...words);
          newCap = filter.clean(newCap);
          
          declined_requests.splice(i, 1);
        }
      }
      
      sender.captions.push({"user": receiver, "caption": newCap});
      sender.declined_requests = declined_requests;
    
      await sender.save({transaction: session});

    }
      
    receiver.nominatedby.push({"name": senderName, "id": senderId});
    receiver.save({transaction: session});

    await session.commit();

    // const mailOptions = {
    //   from: "studentalumnirelationscell@gmail.com",
    //   to: receiverEmail,
    //   subject: "Online Yearbook Portal",
    //   // change the email test from here
    //   html: `<p>Greetings from the Student Alumni Relations Cell! <br>
    //                         You have been nominated by <b>${senderName}</b> to write a caption for their yearbook.<br>
    //                         Please keep the following points in mind while writing the captions:-<br>
    //                         <ol>
    //                         <li> There is a no-limit rule to the captions you can write about your friends! </li>
    //                         <li> You can modify the caption before the deadline through the notifications tab. </li>   
    //                         <li> Please refrain from using any expletives or Devanagari script while writing captions. </li>
    //                         </ol>
    //                         Login at yearbook.bits-sarc.in to enter the caption under the notifications tab  <br>
    //                         <br>
    //                         Regards,

    //                         Student Alumni Relations Cell! <br>
    //                         </p>`,
    // };

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

    sender = await User.findByPk(senderId);
    receiver = await User.findByPk(receiverId);

    const requests = sender.requests;
    let newCap;

    for (let i = 0; i < requests.length; i++) {
      if (requests[i].user === receiver) {
        newCap = requests[i].caption;
        requests.splice(i, 1);
      }
    }
    
    await receiver.declined_requests.push({"user": receiver, "caption": newCap});
    sender.requests = requests;
    receiver.save();
    sender.save();

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
