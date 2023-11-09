const Aliment = require("../models/Aliment");
const Consumption = require("../models/Consumption");

const consumptionService = {
  async createConsumption({ aliments, user, quantity, consumptionDate, mealType }) {
    const consumption = await Consumption.create({
      aliments,
      user,
      quantity,
      consumptionDate,
      mealType,
    });
    return consumption; 
  },
  async addAlimentToAConsumption(consumptionId, alimentId,quantity) {
    const consumption=await Consumption.findById(consumptionId);
    if(consumption!=null && Aliment.findById(alimentId)){
    const objet={aliment:alimentId,quantity:quantity};
    consumption.aliments.push(objet);
    return await consumption.save();
  }
  else {
    console.log(consumptionId,"   ",alimentId,"   ",quantity)
    throw new Error("Consumption or aliment not found");
  }

  },
  async getConsumptionById(consumptionId) {
    const consumption = await Consumption.findById(consumptionId).select(
      "-password"
    );
    if (!consumption) {
      throw new Error("Consumption not found");
    }
    return consumption; 
  },

  async getAllConsumptions() {
    const consumptions = await Consumption.find();
    return consumptions.map((consumption) => consumption.toObject());
  },

  async updateConsumption(consumptionId, updatedData) {
    return await Consumption.findByIdAndUpdate(consumptionId, updatedData, {
      new: true,
    });
  },

  async deleteConsumption(consumptionId) {
    return await Consumption.findByIdAndDelete(consumptionId);
  }
};

module.exports = consumptionService;
