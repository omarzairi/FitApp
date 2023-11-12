const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" || "Coach",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Message = mongoose.model("Messages", MessageSchema);
module.exports = Message;