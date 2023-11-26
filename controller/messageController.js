const express = require("express");
const asyncHandler = require("express-async-handler");
const messageService = require("../services/messageService.js");
const Message = require("../models/Message.js");
const Coach = require("../models/Coach.js");
const User = require("../models/User.js");
const messageControl = express.Router();
const protectUser = require("../middleware/userAuth.js");
const protectCoach = require("../middleware/coachAuth.js");
messageControl.post(
  "/userSend",
  protectUser,

  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      const from = user._id;
      const to = req.body.to;
      const message = await messageService.createMessage({
        message: { text: req.body.message },
        sender: from,
        users: [from.toString(), to.toString()],
      });
      if (message) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/coachSend",
  protectCoach,
  asyncHandler(async (req, res) => {
    try {
      const coach = await Coach.findById(req.coach);
      const from = coach._id;
      const to = req.body.to;
      const message = await messageService.createMessage({
        message: { text: req.body.message },
        sender: from,
        users: [from.toString(), to.toString()],
      });
      if (message) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/getUsersMessages",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      const from = user._id;
      const to = req.body.to;
      const messages = await Message.find({
        users: { $all: [from.toString(), to.toString()] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from.toString(),
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.post(
  "/getCoachMessages",
  protectCoach,
  asyncHandler(async (req, res) => {
    try {
      const coach = await Coach.findById(req.coach);
      const from = coach._id;
      const to = req.body.to;
      const messages = await Message.find({
        users: { $all: [from.toString(), to.toString()] },
      }).sort({ updatedAt: 1 });
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from.toString(),
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

//delete all
messageControl.delete(
  "/deleteAll",

  asyncHandler(async (req, res) => {
    try {
      const messages = await Message.deleteMany({});
      if (messages) return res.json({ msg: "Messages deleted successfully." });
      else
        return res.json({ msg: "Failed to delete messages from the database" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.get(
  "/getMyLatestConvos",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user);
      const from = user._id;
      const messages = await Message.find({
        users: { $in: [from.toString()] },
      }).sort({ updatedAt: -1 });
      const uniqueUsers = [];
      const uniqueUsersMessages = [];
      messages.forEach((msg) => {
        if (!uniqueUsers.includes(msg.users[1])) {
          uniqueUsers.push(msg.users[1]);
          uniqueUsersMessages.push(msg);
        }
      });
      const uniqueUsersMessagesWithNames = await Promise.all(
        uniqueUsersMessages.map(async (msg) => {
          const user = await Coach.findById(msg.users[1]);
          return {
            id: user._id,
            fullName: user.prenom + " " + user.nom,
            image: user.image,
            message: msg.message.text,
            fromSelf: msg.sender.toString() === from.toString() ? true : false,
            timestamp: msg.updatedAt,
          };
        })
      );
      res.json(uniqueUsersMessagesWithNames);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

messageControl.get(
  "/getCoachLatestConvos",
  protectCoach,
  asyncHandler(async (req, res) => {
    try {
      const coach = await Coach.findById(req.coach);

      const from = coach._id;
      const messages = await Message.find({
        users: { $in: [from.toString()] },
      }).sort({ updatedAt: -1 });
      const uniqueUsers = [];
      const uniqueUsersMessages = [];
      messages.forEach((msg) => {
console.log(msg.users[1])
        if (!uniqueUsers.includes(msg.users[1])) {
          uniqueUsers.push(msg.users[1]);
          uniqueUsersMessages.push(msg);
          console.log(uniqueUsersMessages)

        }
      });
      const uniqueUsersMessagesWithNames = await Promise.all(
        uniqueUsersMessages.map(async (msg) => {
          const user = await User.findById(msg.users[0]);
          return {
            id: user._id,
            fullName: user.prenom + " " + user.nom,
            image: user.image,
            message: msg.message.text,
            fromSelf: msg.sender.toString() === from.toString() ? true : false,
            timestamp: msg.updatedAt,
          };
        })
      );
      res.json(uniqueUsersMessagesWithNames);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

module.exports = messageControl;