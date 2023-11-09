const Aliment = require("../models/Aliment");
const Consumption = require("../models/Consumption");

const consumptionService = {

  async createConsumption(consumptionData) {
    const newConsumption = new Consumption(consumptionData);
    newConsumption.total = 0;
    newConsumption.aliments.forEach((aliment) => {
      newConsumption.total += aliment.quantity * aliment.aliment.calories;
    });

    return await newConsumption.save();
  },
  async addAlimentToAConsumption(consumptionId, alimentId, quantity) {
    console.log("you are in addAlimentToAConsumption")
    const consumption = await Consumption.findById(consumptionId);
    const aliment = await Aliment.findById(alimentId);
console.log(consumption,"0000000",aliment)

    if (consumption != null && aliment != null) {
      const objet = { aliment: alimentId, quantity: quantity };


      if (consumption.aliments.find((alimenttab) =>  alimenttab.aliment == alimentId)!=undefined) {
        consumption.aliments.forEach((alimenttab) => {
          if (alimenttab.aliment == alimentId) {
            alimenttab.quantity += quantity;
          }
        });
      }
      else {
        consumption.aliments.push(objet);
      }
      consumption.total += aliment.calories * quantity;
      return await consumption.save();
    }

    else {
      console.log(consumptionId, "   ", alimentId, "   ", quantity)
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
