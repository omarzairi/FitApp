const mongoose = require("mongoose");

const PersonalizedMealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aliments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aliment",
    },
  ],
});

const PersonalizedMeal = mongoose.model(
  "PersonalizedMeal",
  PersonalizedMealSchema
);

module.exports = PersonalizedMeal;
