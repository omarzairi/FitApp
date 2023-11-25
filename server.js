const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoDB.js");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("<center><b>Hello, Welcome To FitApp!</b></center>");
});

const userController = require("./controller/userController");
app.use("/api/users", userController);
const coachController = require("./controller/coachController");
app.use("/api/coaches", coachController);

const alimentController = require("./controller/alimentController");
app.use("/api/aliments", alimentController);

const consumptionController = require("./controller/consumptionController");
app.use("/api/consumptions", consumptionController);

const objectifController = require("./controller/objectifController");
app.use("/api/objectifs", objectifController);

const messageControl = require("./controller/messageController");
app.use("/api/messages", messageControl);

const progressController = require("./controller/progressController");
app.use("/api/progress", progressController);

const server = app.listen(
  PORT,
  console.log(`Server listening at http://localhost:${PORT}`)
);

const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.broadcast.emit("msg-recieve", {
        from: data.from,
        to: data.to,
        message: data.msg,
      });
    }
  });
});
