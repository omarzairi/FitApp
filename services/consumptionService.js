const Consumption = require("../models/Consumption");

const consumptionService = {
  async createConsumption({ aliment, user, quantity, consommationDate, mealType }) {
    const consumption = await Consumption.create({
      aliment,
      user,
      quantity,
      consommationDate,
      mealType,
    });
    return consumption; 
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
