const mongoose = require("mongoose");
const User = require("./user");

const PollSchema = new mongoose.Schema({
  ques: {
    type: String,
    required: [true, "Ques field cannot be empty"],
    maxlength: [300, "Ques cannot be greater than 300 characters"],
  },
  total_count: {
    type: Number,
    default: 0,
  },
  branch: {
    type: String,
    required: [true, "Branch id must be provided"],
  },
  vote: [
    {
      User: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
      is_ans: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
