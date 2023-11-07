const mongoose = require("mongoose");
const consumptionSchema = new mongoose.Schema({
  aliment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Aliment",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  quantity: {
    type: Number,
    required: true,
  },
  consommationDate: {
    type: Date,
    required: true,
  },
  
  mealType: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner","snacks"],

  },

});

const Consumption = mongoose.model("Consumption", consumptionSchema);
module.exports = Consumption;
