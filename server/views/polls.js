const { response } = require("express");
const express = require("express");
const router = express.Router();
const Poll = require("../models/poll");
const { User, Search } = require("../models/user");

const allPolls = async (req, res) => {
  const questions = await Poll.find({})
    .select(["ques", "totalCount", "votes"])
    .populate({ path: "votes", populate: { path: "user" } });
  return res.status(200).json({ questions });
};

const getPoll = async (req, res) => {
  try {
    const pollID = req.params.id;
    const poll = await Poll.findById(pollID).populate({
      path: "votes",
      populate: { path: "user" },
    });

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
    const ques = req.body.question;
    const branch = req.body.branch;

    const users_all = await User.find({});

    const poll = await Poll.create({
      ques: ques,
      branch: branch,
      votes: users_all.map((user) => {
        return { user: user, count: 0, hasVoted: false };
      }),
    });

    res.status(201).json({ poll });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

const updatePoll = async (req, res) => {
  try {
    const pollID = req.params.id;
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
    const pollID = req.params.id;

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
    const voterId = req.user.id;
    const targetId = req.body.targetId;
    const pollId = req.params.id;

    const poll = await Poll.findById(pollId);

    if (!poll)
      return res
        .status(404)
        .json({ msg: `Cannot find a poll with the ID ${pollId}` });

    if (!voterId || !targetId)
      return res.status(400).json({ msg: "Send the target id" });

    const voterUser = poll.votes.find((voter) => voter.user == voterId);
    const targetUser = poll.votes.find((voter) => voter.user == targetId);

    if (voterId == targetId) {
      return res.status(400).json({ msg: "You cannot vote for yourself" });
    }

    if (!voterUser || !targetUser) {
      return res.status(500).json({ msg: "report to admin" });
    }
    if (voterUser.hasVoted != false)
      return res.status(400).json({ msg: "You have already voted" });

    poll.totalCount = poll.totalCount + 1;
    targetUser.count = targetUser.count + 1;
    voterUser.hasVoted = true;

    poll.save();
    return res.status(200).json({ msg: "voted for user", poll: poll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "somethong went wrong" });
  }
};

const leaderboard = async (req, res) => {
  try {
    const response = [];
    const { polls } = await Poll.find({
      totalCount: { $gte: 1 },
      votes: { $size: { $gte: 1 } },
    });
    for (var j = 0; j < polls.length; j++) {
      var { votes } = polls[j].select("votes");

      var maximumValue = votes[0].count;
      var maxIndex = 0;

      for (var i = 1; i < votes.length; i++) {
        if (votes[i].count > maximumValue) {
          maxIndex = i;
          maximumValue = votes[i].count;
        }
      }

      var user = await User.findById(votes[maxIndex].user);
      response.push({ user: user, poll: polls[j] });
    }
    // const { votes } = await Poll.findById(pollId).select("votes");

    // if (votes.length === 0) {
    //   return res.status(404).json({ msg: "poll is empty" });
    // } else {
    //   var maximumValue = votes[0].count;
    //   var maxIndex = 0;

    //   for (var i = 1; i < votes.length; i++) {
    //     if (votes[i].count > maximumValue) {
    //       maxIndex = i;
    //       maximumValue = votes[i].count;
    //     }
    //   }
    // }
    // if (maximumValue === 0) {
    //   return res.status(404).json({ msg: "No poll has been submitted yet" });
    // }
    // const user = await User.findById(votes[maxIndex].user);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Something went wrong" });
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
