const { response } = require("express");
const { postgresClient } = require("../server");
const express = require("express");
const router = express.Router();
const { Poll } = require("../models/poll");
const { User } = require("../models/user");
const { Op } = require("sequelize");

const allPolls = async (req, res) => {

  const polls = await Poll.findAll()
  
  return res.status(200).json({ polls });
};

const getPoll = async (req, res) => {
  try {
    const pollID = req.params.id;

    const poll = await Poll.findByPk(pollID)

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

    const users_all = await User.findAll();

    const poll = await Poll.create({
      question: ques,
      branch: branch,
      votes: users_all.map((user) => {
        return { user: user.user_id, count: 0, hasVoted: false };
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

    const poll = await Poll.findByPk(pollID);

    poll.question = question;
    poll.set('question', poll.question);
    poll.changed('question', true);
    await poll.save();

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

    const poll = await Poll.findByPk(pollID);

    if (!poll) {
      return res
        .status(404)
        .json({ msg: `No poll found with the id ${pollID}` });
    }

    await Poll.destroy({where: {poll_id: pollID}});

    res.status(200).json({ msg: `Poll with ID ${pollID} was deleted` });
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

    const poll = await Poll.findByPk(pollId);

    if (!poll)
      return res
        .status(404)
        .json({ msg: `Cannot find a poll with the ID ${pollId}` });

    if (!voterId || !targetId)
      return res.status(400).json({ msg: "Send the target id" });

    const voterUser = poll.votes.find((voter) => voter.user == voterId);
    const targetUser = poll.votes.find((target) => target.user == targetId);

    if (voterId == targetId) {
      return res.status(400).json({ msg: "You cannot vote for yourself" });
    }

    if (!voterUser || !targetUser) {
      return res.status(500).json({ msg: "report to admin" });
    }

    if (voterUser.hasVoted){
      return res.status(400).json({ msg: "You have already voted" });
    }

    poll.totalCount = poll.totalCount + 1;
    
    targetUser.count = targetUser.count + 1;
    voterUser.hasVoted = true;

    poll.set('votes', poll.votes); // setting the column 'votes' manually to our local variable poll.votes
    poll.changed('votes', true); // telling sequelize manually that this column has changed and needs updating.

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

    const polls = await Poll.findAll({
      where: {
        totalCount:{
          [Op.gte]: 1,  
        }
      }
    });

    for (var j = 0; j < polls.length; j++) {
      var votes = polls[j].votes;

      var maximumValue = votes[0].count;
      var maxIndex = 0;

      for (var i = 1; i < votes.length; i++) {
        if (votes[i].count > maximumValue) {
          maxIndex = i;
          maximumValue = votes[i].count;
        }
      }

      let user = await User.findByPk(votes[maxIndex].user);

      response.push({ id: user.id, name: user.name, votes: maximumValue, imageUrl: user.imageUrl, bitsId: user.bitsId, pollQuestion: polls[j].question });
    }

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
