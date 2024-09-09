const { User } = require("../models/user");
const { Poll } = require("../models/poll");
const { Commitment } = require("../models/commitment")
const { postgresClient } = require("../db/postgres");
const jwt = require("jsonwebtoken");
const {v4: isUuid} = require("uuid");
const Filter = require("bad-words");
const words = require("../bad-words.json");
const { Sequelize } = require("sequelize");

// Syncing the database.
// User.sync({alter: true});
// Poll.sync({alter: true});
// Commitment.sync({alter: true});
// For Dev testing:
User.sync({force: true});
Poll.sync({force: true});
Commitment.sync({force: true});

const editProfile = async (req, res) => {
  try {
    try{
      const userId = req.user.id;
      // const userId = req.body.id; // for POSTMAN testing

      const user = await User.findByPk(userId);

      const imgUrl = req.body.imgUrl;
      if (imgUrl != "") {
        user.imageUrl = imgUrl;
        user.set('imgUrl', user.imgUrl);
        user.changed('imgUrl', true);
      }
  
      var quote = req.body.quote;
      const filter = new Filter({ placeHolder: "x" });
      filter.addWords(...words);
      quote = filter.clean(quote);
  
      if (quote != "") {
        user.quote = quote;
        user.set('quote', user.quote);
        user.changed('quote', true);
      }

      await user.save();

      return res.status(200).send({
        status: "success",
        message: "Successfully Updated",
        user: user
      });
    }catch(error){
      console.log("[editProfile Route] An error has occurred: ", error);
      return res.status(400).send({
        status: "failure",
        message: "[editProfile Route] An error has occurred",
        error: error
      })
    }

  } catch (error) {
    console.log("[editProfile Route] An error has occurred: ", error);
    return res.status(400).send({
      status: "failure",
      message: "There was an error, Please try after some time",
      error: error
    });
  }
};

const writeCaption = async (req, res) => {
  try {
    var caption = req.body.caption;

    const writerId = req.user.id;
    // const writerId = req.body.id; // for POSTMAN testing

    const targetId = req.params.id;
    
    if (writerId == targetId) {
      return res.send({
        status: "failure",
        msg: "You can't write for yourself",
      });
    }

    const filter = new Filter({ placeHolder: "x" });
    filter.addWords(...words);
    caption = filter.clean(caption);

    const writer = await User.findOne({where: {user_id: writerId}});

    // Creating a temporary array to copy the ID's from Nominated JSON Array, and checking if Writer is Nominated.
    let temp = [];
    writer.nominatedby.forEach((x) => temp.push(x.id));

    if (!temp.includes(targetId)) {
      return res.status(403).send({
        error: "You're not nominated to write the caption!",
      });
    }

    if (caption === "") {
      session.rollback();
      return res.send({
        error: "Please enter a valid caption!",
      });
    } else {
      
      const writer = await User.findOne({where: {user_id: writerId}});
      const receiver = await User.findOne({where: {user_id: targetId}});

      const captions = receiver.captions;

      //checking if a caption has already been written or not, then we'll update otherwise push a new one

      // Case where the caption already exists, and we have to replace it:
      if (captions.find((o) => o.user == writer.user_id)) {
        for (let i = 0; i < captions.length; i++) {
          if (captions[i].user == writer.id) {
            captions[i].caption = caption;
            // If user.update command below doesn't work, alternatively we might have to do this:
            //await receiver.save({transaction: session});
          }
        }
        
        // Passing the created captions object as the new entry.
        await User.update({captions: captions}, {where: {user_id: targetId}});
        
        return res.send({ success: "Succesfully Updated" });

      } else {

        // Case where the caption did not exist and we have to push a new element into the captions array
        receiver.captions.push({"user": writerId, "caption": caption});
        receiver.set('captions', receiver.captions);
        receiver.changed('captions', true);
        await receiver.save();

        console.log("succesfully added the caption", receiver.captions)
        return res.send({success: "Succesfully Added"});
      }
    }
  } catch (err) {
    console.log("There was an error - captions", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const addProfile = async (req, res) => {
  try {
    const usr = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (usr) {
      console.log(usr);
      return res.status(400).send({
        msg: "User Exists Already",
      });
    } else {
      const bitsId = req.body.id;
      const stringyear = bitsId.substring(0,4);
      const year = Number(stringyear);

      let senior = false;

      if(year<=2021){
        senior = true;
      }
      console.log("[addProfile Route] This was the year: ", year);
      console.log("[addProfile Route] This is the senior status: ", senior);

      let branchCode = bitsId.substring(4, bitsId.length - 4);

      if (branchCode.includes("B")) {
        branchCode = [branchCode.substring(0, 2), branchCode.substring(2, 4)];
      } else if ((branchCode[0] = "A")) {
        branchCode = [branchCode.substring(0, 2)];
      } else {
        branchCode = [branchCode];
      }

      var quote = req.body.quote;
      const filter = new Filter({ placeHolder: "x" });
      filter.addWords(...words);
      quote = filter.clean(quote);

      const user = await User.create({
        name: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        bitsId: bitsId,
        personalEmail: req.body.pEmail,
        phone: req.body.phone,
        quote: quote,
        branchCode: branchCode,
        imageUrl: req.body.imgUrl,
      });

      // Updating all the existing Polls with the new User's data:

      const new_vote = { user: user.user_id, count: 0, hasVoted: false };

      if(!Poll.findAll()){
        await Poll.findAll()
                  .then((results) => {
                    results.map((poll) => {
                    poll.votes.push(new_vote);
                    poll.set('votes', poll.votes);
                    poll.changed('votes', true);
                    poll.save();
                  });
        });
      }

      // Creating a JWT token for the created user:

      const token = jwt.sign(
        { id: user.user_id, bitsId, email: user.email, branchCode },
        process.env.TOKEN_KEY,
        { expiresIn: "180d" }
      );

      // dev testing
      console.log("the user is created: ", user);
      console.log("The JWT token is: ", token);

      return res.send({
        detail: "Profile created",
        id: user.user_id,
        token: token,
      });
    }
  } catch (err) {
    console.log("There was an error - addProfile", err);
    return res.status(500).send({
      status: "failure",
      msg: "There was an error, Please try after some time",
      err: err
    });
  }
};

const searchUsers = async (req, res) => {
  try {

    const search_term = req.query.name;
    const query = `SELECT * FROM USERS WHERE NAME LIKE :search_value`;
    const searchvalue = `%{search_term}%`;

    const [results, metadata] = await postgresClient.query(query, {
      replacements: { search_value: searchvalue},
      type: postgresClient.QueryTypes.SELECT
    });

      return res.send({users: results});
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    if(!userId || !isUuid(userId)){
      console.log("This is not a valid userID - getProfile", userId);
      return res.status(400).send({
        status: "failure",
        msg: "Invalid userID or missing UserID"
      })
    }
    console.log("This is the UserID: ", userId);
    
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).send({
        status: "failure",
        msg: "User does not exist"
      });
    }

    console.log(user);

    let captions = [];
    if(user.captions!==null){
      user.captions.forEach((element) => {
        captions.push({
          id: element.user.id,
          bitsId: element.user.bitsId,
          name: element.user.name,
          caption: element.caption,
          imageUrl: element.user.imageUrl,
        });
      });    
    }

    return res.send({
      user: {
        name: user.name,
        imageUrl: user.imageUrl,
        bitsId: user.bitsId,
        discipline: user.branchCode,
        quote: user.quote,
        captions: captions,
        nominatedby: user.nominatedby,
        requests: user.requests,
        declined_requests: user.declined_requests,
      },
    });
  } catch (err) {
    console.log("There was an error - getprofile", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const users = await User.findAll();

    try{
      for(const user of users){
        // removing user from nomination lists of others.
        const updatedNominations = user.nominatedby.filter(nomination => nomination.id != req.params.id)
        user.nominatedby=updatedNominations;
        // removing user's posts on others' message wall.
        const updatedCaptions = user.captions.filter(caption => caption.user.id != req.params.id)
        user.captions=updatedCaptions;
        // removing user's requests to other profiles.
        const updatedRequests = user.requests.filter(request => request.user.id != req.params.id)
        user.requests=updatedRequests;
        const updatedDeclinedRequests = user.declined_requests.filter(declinedrequest => declinedrequest.id != req.params.id)
        user.declined_requests=updatedDeclinedRequests;

        user.set('requests', user.requests);
        user.changed('requests', true);
        user.set('declined_requests', user.declined_requests);
        user.changed('declined_requests', true);
        user.set('nominatedby', user.nominatedby);
        user.changed('nominatedby', true);
        user.set('captions', user.captions);
        user.changed('captions', true);

        await user.save();
      }
    }catch(err){
      console.log("There was an error - deleteProfile", err);
      return res.status(500).send({
        status: "failure",
        msg: "Something went wrong"
      })
    }

    const polls = await Poll.findAll();

    try{
      for(const poll of polls){
        // removing the user's votes from all the polls:
        const updatedVotes = poll.votes.filter(vote => vote.user.id != req.params.id)
        poll.votes = updatedVotes;
        poll.totalCount = poll.votes.length;
        
        poll.set('votes', poll.votes);
        poll.changed('votes', true);
        poll.set('totalCount', poll.totalCount);
        poll.changed('totalCount', true);

        await poll.save();
      }

    }catch(err){
      console.log("There was an error - deleteProfile", err);
      return res.status(500).send({
        status: "failure",
        msg: "Something went wrong"
      })
    }

    // Delete query 
    await User.destroy({where: { user_id: req.params.id }});
    console.log("Delete Execution Succesful: Profile has been Deleted");
    return res.send({detail: "Profile deleted"});

  } catch (err) {
    console.log("There was an error - deleteProfile", err);
    return res.status(500).send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};


module.exports = {
  editProfile,
  writeCaption,
  addProfile,
  searchUsers,
  getProfile,
  deleteProfile,
};
