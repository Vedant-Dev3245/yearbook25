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

router.get("/leaderboard", leaderboard);
router.get("/", allPolls);
router.get("/:id", getPoll);
router.post("/", isAdmin, createPoll);
router.patch("/:id", isAdmin, updatePoll);
router.delete("/:id", isAdmin, deletePoll);
router.put("/:id/vote", votePoll);

module.exports = router;
