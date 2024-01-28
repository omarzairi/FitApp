const mongoose = require("mongoose");
const consumptionSchema = new mongoose.Schema({
  aliments: [
    {
      aliment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Aliment",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  consumptionDate: {
    type: Date,
    required: true,
  },

  mealType: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
});

const Consumption = mongoose.model("Consumption", consumptionSchema);
module.exports = Consumption;
