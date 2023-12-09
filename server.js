const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
const connectDB = require("./config/mongoDB.js");
const Aliment = require("./models/Aliment.js");

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

const personalizedMealController = require("./controller/personalizedMealController");
app.use("/api/perso", personalizedMealController);

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
    console.log(onlineUsers);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.broadcast.emit("msg-recieve", {
        from: data.from,
        to: data.to,
        message: data.message,
      });
    }
  });
});

// const getRandomRecipe = async () => {
//   try {
//     const response = await axios.get(
//       "https://api.spoonacular.com/recipes/random?number=1&tags=snacks&apiKey=a69294f5de7041b1bf88a6ba9d8ef618"
//     );
//     console.log(
//       "Random recipe fetched successfully:",
//       response.data.recipes[0]
//     );
//     return response.data.recipes[0];
//   } catch (error) {
//     console.error("Error fetching random recipe:", error.message);
//     throw error;
//   }
// };

// const getNutritionInfo = async (recipeId) => {
//   try {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=a69294f5de7041b1bf88a6ba9d8ef618`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching nutrition info:", error.message);
//     throw error;
//   }
// };

// const saveToDatabase = async (recipe) => {
//   const { id, title, extendedIngredients, image } = recipe;

//   const nutritionInfo = await getNutritionInfo(id);

//   const { calories, protein, carbs, fat, nutrients, weightPerServing } =
//     nutritionInfo;

//   const sugar =
//     nutrients.find((nutrient) => nutrient.name === "Sugar")?.amount || 0;

//   const alimentData = {
//     idInApi: id.toString(),
//     name: title,
//     calories: parseFloat(calories),
//     protein: parseFloat(protein),
//     carbs: parseFloat(carbs),
//     fat: parseFloat(fat),
//     sugar: parseFloat(sugar),
//     image: image,
//     servingSize: weightPerServing.amount || 0,
//     servingUnit: weightPerServing.unit || "g",
//     category: "Snack",
//   };
//   console.log(alimentData);

//   // Save to the database
//   try {
//     //check if idInApi in databasee first
//     const alimentInDb = await Aliment.findOne({ idInApi: id.toString() });
//     if (alimentInDb) {
//       console.log("Aliment already exists in the database:", alimentData);
//       return;
//     }
//     const aliment = new Aliment(alimentData);
//     await aliment.save();
//     console.log("Aliment saved to the database:", alimentData);
//   } catch (error) {
//     console.error("Error saving to the database:", error.message);
//     throw error;
//   }
// };

// const main = async () => {
//   try {
//     const randomRecipe = await getRandomRecipe();

//     await saveToDatabase(randomRecipe);
//   } catch (error) {
//     console.error("Main error:", error.message);
//   }
// };

// main();
