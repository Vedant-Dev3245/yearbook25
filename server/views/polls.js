const express = require("express");
const router = express.Router();
const Poll = require("../models/poll");
const { User, Search } = require("../models/user");

const allPolls = async (req, res) => {
  const questions = await Poll.find({}).select(["ques", "total_count"]);
  return res.status(200).json({ questions });
};

const getPoll = async (req, res) => {
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
};

const createPoll = async (req, res) => {
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
};

const updatePoll = async (req, res) => {
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
};

const deletePoll = async (req, res) => {
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
};

const votePoll = async (req, res) => {
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
};

const leaderboard = async (req, res) => {
  try {
    const { id: pollID } = req.params;
    const arr = await Poll.findById(pollID).select("vote");
    if (arr.length === 0) {
      return res.status(404).json({ msg: "poll is empty" });
    } else {
      var maximumValue = arr[0].count;
      var maxIndex = 0;

      for (var i = 1; i < arr.length; i++) {
        if (arr[i].count > maximumValue) {
          maxIndex = i;
          maximumValue = arr[i].count;
        }
      }
    }
    if (maximumValue === 0) {
      return res.status(404).json({ msg: "No poll has been submitted yet" });
    }
    const user = await User.find({ email: arr[maxIndex].User });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  allPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
  leaderboard,
};
