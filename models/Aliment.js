const mongoose = require("mongoose");

const alimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  servingUnit: {
    type: String,
    required: true,
  },
});

const Aliment = mongoose.model("Aliment", alimentSchema);
module.exports = Aliment;
