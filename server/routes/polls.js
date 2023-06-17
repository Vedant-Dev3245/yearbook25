const express = require("express");
const middleware = require("./auth-middlewares");
const router = express.Router();
const users = require("../users");
const Poll = require("../models/poll");
const { User, Search } = require("../models/user");

//getall(user and admin)
router.route("/").get(async (req, res) => {
  const questions = await Poll.find({}).select(["ques", "total_count"]);
  return res.status(200).json({ questions });
});

//getone(user and admin)
router.route("/:id").get(async (req, res) => {
  try {
    const { id: pollID } = req.params;
    const poll = await Poll.findById(pollID);
    if (!poll) {
      return res.status(404).json({ msg: `No poll found by the ID ${pollID}` });
    }
    res.status(200).json({ poll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

// {
//   question: "some ques";
// }
//create(admin)
router.route("/create").post(async (req, res) => {
  try {
    const users_all = await User.find({});
    const ques = req.body.question;
    const poll = await Poll.create({
      ques: ques,
      vote: users_all.map((user) => {
        return { User: user.email, count: 0, is_ans: false };
      }),
    });
    res.status(201).json({ poll });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "something went wrong" });
  }
});

// {
//   question: "updated ques";
// }
//update(admin)
router.route("/update/:id").patch(async (req, res) => {
  try {
    const { id: pollID } = req.params;
    const question = req.body.question;
    const poll = await Poll.findByIdAndUpdate(
      pollID,
      { ques: question },
      { new: true, runValidators: true }
    );
    if (!poll) {
      return res.status(404).json({ msg: `No poll found with ID ${pollID}` });
    }
    res.status(200).json({ poll });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "something went wrong" });
  }
});

//delete(admin)
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id: pollID } = req.params;
    const poll = await Poll.findByIdAndDelete(pollID);
    if (!poll) {
      return res
        .status(404)
        .json({ msg: `No poll found with the id ${pollID}` });
    }
    res.status(200).json({ msg: `Poll with ID ${pollID} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

// {
//     user_main(the one sending): email
//     user_to_vote: email (from search api)
// }

//post(User)-to ans the poll
router.route("/vote/:id").patch(async (req, res) => {
  try {
    const user_main = req.body.user_main;
    const to_vote = req.body.user_to_vote;
    const { id: pollID } = req.params;
    const poll = await Poll.findById(pollID);
    const total = poll.total_count;
    console.log(total);
    if (user_main === to_vote) {
      return res.status(400).json({ msg: "You cannot vote for yourself" });
    }
    if (!poll) {
      return res
        .status(404)
        .json({ msg: `Cannot find a poll with the ID ${pollID}` });
    }
    if (!user_main || !to_vote) {
      return res
        .status(400)
        .json({ msg: "Send both the user mail and the person voted" });
    }
    if (poll.vote.find((user) => user.User === user_main)["is_ans"] === false) {
      const poll_updated = await Poll.findById(pollID).then((doc) => {
        doc.total_count = total + 1;
        main_user = doc.vote.find((user) => user.User === user_main);
        to_vote_user = doc.vote.find((user) => user.User === to_vote);
        to_vote_user["count"] = to_vote_user["count"] + 1;
        main_user["is_ans"] = true;
        doc.save();
      });
    } else {
      return res.status(400).json({ msg: "You have already voted" });
    }
    res.status(200).json({ msg: "successfullupdated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "somethong went wrong" });
  }
});

module.exports = router;
