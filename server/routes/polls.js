const express = require("express");
const router = express.Router();
const Poll = require("../models/poll");
const { User, Search } = require("../models/user");
const {
  allPolls,
  getPoll,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
  leaderboard,
} = require("../views/polls");
const { isAdmin } = require("../middleware/auth");

//getall(user and admin)
router.get("/", allPolls);

//getone(user and admin)
router.get("/:id", getPoll);

// {
//   question: "some ques";
//   branch : "branch"
// }
//create(admin)
router.post("/create", isAdmin, createPoll);

// {
//   question: "updated ques";
// }
//update(admin)
router.patch("/update/:id", isAdmin, updatePoll);

//delete(admin)
router.delete("/delete/:id", isAdmin, deletePoll);

// {
//     user_main(the one sending): email
//     user_to_vote: email (from search api)
// }

//post(User)-to ans the poll
router.patch("/vote/:id", votePoll);

router.get("/leaderboard/:id", leaderboard);

module.exports = router;
