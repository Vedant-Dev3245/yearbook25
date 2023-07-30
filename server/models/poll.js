const mongoose = require("mongoose");
const User = require("./user");
const { ObjectId } = require("mongodb");

const PollSchema = new mongoose.Schema({
  ques: {
    type: String,
    required: [true, "Ques field cannot be empty"],
    maxlength: [300, "Ques cannot be greater than 300 characters"],
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  branch: {
    type: String,
  },
  votes: [
    {
      user: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
      hasVoted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
