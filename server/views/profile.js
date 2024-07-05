const { User } = require("../models/user");
const Poll = require("../models/poll");

const jwt = require("jsonwebtoken");
const Filter = require("bad-words");
const words = require("../bad-words.json");
const { Sequelize } = require("sequelize");

// Syncing the database.
User.sync({force: true});
Poll.sync({force: true});


const editProfile = async (req, res) => {
  try {
    const session = await User.transaction();
    try{
      // Here we are trying to access the JWT token data to verify the BITS ID
      const user = await User.findOne({where: {user_id: req.user.id}}, {transaction: session});

      const imgUrl = req.body.imgUrl;
      if (imgUrl != "") {
        await user.update({imageUrl: imgUrl}, {where: {user_id: req.user.id}}, {transaction: session});
      }
  
      var quote = req.body.quote;
      const filter = new Filter({ placeHolder: "x" });
      filter.addWords(...words);
      quote = filter.clean(quote);
  
      if (quote != "") {
        await user.update({quote: quote}, {where: {user_id: req.user.id}}, {transaction: session});
      }
  
      await session.commit();

      console.log("Transaction was succesful", user);
      return res.send({
        msg: "Successfully Updated",
        user: user
      });
    }catch(err){
      console.log("Some error occurred during the transaction", err);
      await session.rollback();
    }

  } catch (err) {
    return res.status(400).send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};


const writeCaption = async (req, res) => {
  try {
    var caption = req.body.caption;
    const writerId = req.user.id;
    const targetId = req.params.id;
    
    console.log(caption, writerId, receiverId);

    if (writerId == targetId) {
      return res.send({
        status: "failure",
        msg: "You can't write for yourself",
      });
    }

    const session = await User.transaction();

    const filter = new Filter({ placeHolder: "x" });
    filter.addWords(...words);
    caption = filter.clean(caption);

    const writer = await User.findOne({where: {user_id: writerId}}, {transaction: session});

    // Creating a temporary array to copy the ID's from Nominated JSON Array, and checking if Writer is Nominated.
    let temp = [];
    writer.nominatedby.forEach((x) => temp.push(x.id));

    if (!temp.includes(targetId)) {
      session.rollback();
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
      
      const writer = await User.findOne({where: {user_id: writerId}}, {transaction: session});
      const receiver = await User.findOne({where: {user_id: receiverId}}, {transaction: session});

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
        await user.update({captions: captions}, {where: {user_id: receiverId}}, {transaction: session});
        
        await session.commit();
        return res.send({ success: "Succesfully Updated" });

      } else {

        // Case where the caption did not exist and we have to push a new element into the captions array
        receiver.captions.push({"user": writer.user_id, "caption": caption});

        await receiver.save({transaction: session});
        await session.commit();
        
        console.log("succesfully added the caption", receiver.captions)
        return res.send({success: "Succesfully Added"});
      }
    }
  } catch (err) {
    await session.rollback();
    console.log("There was an error", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};


const addProfile = async (req, res) => {
  try {
    usr = await User.findOne({
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

      // !!! Implement the Polls related feature for new user creation.

      // const new_vote = { user: user, count: 0, hasVoted: false };

      // await Poll
      //       .find({})
      //       .then((results) => {
      //         results.map((poll) => {
      //           poll.votes.push(new_vote);
      //           poll.save();
      //         });
      // });

      // !!! Implement Mongoose Search Instances in PostgreSQL
      
      // const userId = user.id;
      // const withoutQuotes = userId.toString().replace(/"/g, ""); //removing """ from objectId thus generated
      // console.log(userId);
      // const search = new Search({
      //   uId: withoutQuotes,
      //   name: user.name,
      //   bitsId: user.bitsId,
      // });
      // await search.save();

      // Creating a JWT token for the created user:

      const token = jwt.sign(
        { id: user.id, bitsId, email: user.email, branchCode },
        process.env.TOKEN_KEY,
        { expiresIn: "180d" }
      );

      // dev testing
      console.log("the user is created: ", usr);
      console.log("The JWT token is: ", token);

      return res.send({
        detail: "Profile created",
        id: user.id,
        token: token,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: "failure",
      msg: "There was an error, Please try after some time",
      err: err
    });
  }
};

/*
const searchUsers = async (req, res) => {
  try {
    let result = await Search.aggregate([
      {
        $search: {
          index: "search",
          autocomplete: {
            //autocomplete is implemented so that suggestions are sent to front
            query: `${req.query.name}`,
            path: "name",
          },
        },
      },
      {
        $limit: 12,
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    // use this for local deployment
    // let result = await Search.find({
    //     $text: {
    //         $search: `${req.query.name}`,
    //     }
    // })
    res.send({ users: result });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
*/

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id}})
    // !!! In this route check if nominations, requests, declined_requests all show up correctly.

    if (!user) {
      return res.status(400).send();
    }

    console.log(user);


    let captions = [];
    user.captions.forEach((element) => {
      captions.push({
        id: element.user.id,
        bitsId: element.user.bitsId,
        name: element.user.name,
        caption: element.caption,
        imageUrl: element.user.imageUrl,
      });
    });

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
    console.log("There was an error", err);
    return res.send({
      status: "failure",
      msg: "There was an error, Please try after some time",
    });
  }
};


const deleteProfile = async (req, res) => {
  try {
    const users = await User.findAll();
    const session1 = await User.transaction();

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

        await user.save({transaction: session1});
      }
      await session1.commit();
      console.log("Session1 was succesful");
    }catch(err){
      await session1.rollback();
      console.log("Session1 was unsuccesful", err);
    }

    const polls = await Poll.findAll();
    const session2 = await Poll.transaction();

    try{
      for(const poll of polls){
        // removing the user's votes from all the polls:
        const updatedVotes = poll.votes.filter(vote => vote.user.id != req.params.id)
        poll.votes = updatedVotes;
        poll.totalCount = poll.votes.length;

        await poll.save({transaction: session2});
      }

      await session2.commit();
      console.log("Session2 was succesful");
    }catch(err){
      await session2.rollback();
      console.log("Session2 was unsuccesful", err);
    }

    console.log("removed the user from all records in nominations, captions, requests, declined_requests");

    // Delete query 
    await User.destroy({where: { user_id: req.params.id }});
    console.log("Delete Execution Succesful: Profile has been Deleted");
    return res.send({detail: "Profile deleted"});

  } catch (err) {
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
  /*searchUsers,*/
  getProfile,
  deleteProfile,
};
