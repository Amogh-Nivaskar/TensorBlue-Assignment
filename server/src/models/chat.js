const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  conversation: [
    {
      from: String,
      date: Date,
      statement: String,
    },
  ],
});

module.exports = mongoose.model("Chat", ChatSchema);
