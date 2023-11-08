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
  res.send("<center><b>Hello 3ASISOS Welcome To FitApp!</b></center>");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

const userController = require("./controller/userController");
app.use("/api/users", userController);

const alimentController = require("./controller/alimentController");
app.use("/api/aliments", alimentController);

const consumptionController = require("./controller/consumptionController");
app.use("/api/consumptions", consumptionController);

const objectifController = require("./controller/objectifController");
app.use("/api/objectifs", objectifController);
