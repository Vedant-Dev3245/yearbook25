const { User } = require("../models/user");
const { postgresClient } = require("../db/postgres");
const Filter = require("bad-words");
const words = require("../bad-words.json");
const { request } = require("express");

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

    if(caption==null){
      return res.send({
        status: "failure",
        msg: "Please enter a caption",
      })
    }

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
      console.log("Request has already been sent by" + senderId + " to " + targetId);
      return res.status(500).send({
        status: "failure",
        msg: "You have already sent a request to this user",
      });
    }

    target.requests.push({"user": senderId, "caption": caption});
    target.set('requests', target.requests);
    target.changed('requests', true);
    await target.save();

    return res.send({
      status: "success",
      msg: "Request sent successfully!",
    });

  } catch (err) {
    console.log("There was an erorr: sendRequest", err);

    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const allRequests = async (req, res) => {
  try {
    const senderId = req.user.id;
    // const senderId = req.body.id;
    const sender = await User.findByPk(senderId)
    let requests = {};
    let declined_requests = {};

    if(sender){
      requests = sender.requests || {};
      declined_requests = sender.declined_requests || {};
    }

    return res.send({
      status: "success",
      requests: requests,
      declined_requests: declined_requests,
    });
  } catch (err) {
    console.log("There was an erorr: allRequests", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const nominateUser = async (req, res) => {
  try {
    // const senderId = req.user.id;
    const senderId = req.body.id;
    const receiverId = req.body.receiverId;

    // const session = await postgresClient.transaction();
  
    const receiver = await User.findByPk(receiverId);
    const sender = await User.findByPk(senderId);

    const senderName = sender.name;

    if (receiver.nominatedby!==null && receiver.nominatedby.find((obj) => obj.id == senderId)) {
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

    // Handling the cases where request was already sent by the targetUser: 

    if (sender.requests!==null && sender.requests.find((o) => o.user == receiverId)) {
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

        sender.set('captions', sender.captions);
        sender.changed('captions', true);
        sender.set('requests', sender.requests);
        sender.changed('requests', true);
  

        await sender.save();

      }catch(err){
        console.log("Some error occured ", err);
        return res.status(500).send({"message": "An error occured"});
      }
    }
    
    
    else if (sender.declined_requests!==null && sender.declined_requests.find((o) => o.user == receiverId)) {
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
    
      sender.set('captions', sender.captions);
      sender.changed('captions', true);
      sender.set('declined_requests', sender.declined_requests);
      sender.changed('declined_requests', true);

      await sender.save();

    }

    receiver.nominatedby.push({"name": senderName, "id": senderId});
    receiver.set('nominatedby', receiver.nominatedby);
    receiver.changed('nominatedby', true);
    await receiver.save();

    // await session.commit();

    return res.send({
      status: "success",
      msg: "Friend nominated successfully!",
    });
  } catch (err) {
    console.log("There was an erorr: nominateUser", err);
    return res.send({
      status: "failure",
      msg: err.message,
    });
  }
};

const declineRequest = async (req, res) => {
  try {
    // senderId = req.user.id;
    const senderId = req.body.id;
    const receiverId = req.body.receiverId;

    const sender = await User.findByPk(senderId);

    const requests = sender.requests;
    let newCap;

    for (let i = 0; i < requests.length; i++) {
      if (requests[i].user === receiverId) {
        newCap = requests[i].caption;
        requests.splice(i, 1);
      }
    }
    
    sender.declined_requests.push({"user": receiverId, "caption": newCap});
    sender.requests = requests;

    sender.set('declined_requests', sender.declined_requests);
    sender.set('requests', sender.requests);
  
    sender.changed('requests', true);
    sender.changed('declined_requests', true);

    await sender.save();

    return res.send({
      success: "Succesfully declined",
    });
  } catch (err) {
    console.log("There was an erorr: declineRequest", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};


module.exports = { allRequests, nominateUser, declineRequest, sendRequest };
