const mongoose = require("mongoose");

const alimentSchema = new mongoose.Schema({
  idInApi: {
    type: String,
    required: false,
    //make it unique please only once cant be duplicated
    unique: true,
  },
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
  image: {
    type: String,
    required: false,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  servingUnit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Aliment = mongoose.model("Aliment", alimentSchema);
module.exports = Aliment;
