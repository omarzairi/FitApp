const mongoose = require("mongoose");
const consumptionSchema = new mongoose.Schema({
  aliments: [{
    aliment:{

    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Aliment"},
    quantity: {
      type: Number,
    
  },}
],
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
    enum: ["breakfast", "lunch", "dinner","snacks"],

  },

});

const Consumption = mongoose.model("Consumption", consumptionSchema);
module.exports = Consumption;
