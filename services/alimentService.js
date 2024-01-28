const Aliment = require("../models/Aliment");

class AlimentService {
  async createAliment(alimentData) {
    const newAliment = new Aliment(alimentData);
    return await newAliment.save();
  }

  async getAlimentById(alimentId) {
    return await Aliment.findById(alimentId);
  }

  async getAllAliments() {
    return await Aliment.find();
  }

  async updateAliment(alimentId, alimentData) {
    return await Aliment.findByIdAndUpdate(alimentId, alimentData, {
      new: true,
    });
  }

  async deleteAliment(alimentId) {
    return await Aliment.findByIdAndRemove(alimentId);
  }
  async searchAliment(searchCriteria) {
    const query = {};

    if (searchCriteria.name) {
      query.name = { $regex: new RegExp(searchCriteria.name, "i") };
    }
    if (searchCriteria.calories) {
      query.calories = searchCriteria.calories;
    }
    if (searchCriteria.protein) {
      query.protein = searchCriteria.protein;
    }
    if (searchCriteria.carbs) {
      query.carbs = searchCriteria.carbs;
    }
    if (searchCriteria.fat) {
      query.fat = searchCriteria.fat;
    }
    if (searchCriteria.sugar) {
      query.sugar = searchCriteria.sugar;
    }
    if (searchCriteria.servingSize) {
      query.servingSize = searchCriteria.servingSize;
    }
    if (searchCriteria.servingUnit) {
      query.servingUnit = {
        $regex: new RegExp(searchCriteria.servingUnit, "i"),
      };
    }
    if (searchCriteria.category){
      query.category = {
        $regex: new RegExp(searchCriteria.category, "i"),
      }
    }
    try {
      const aliments = await Aliment.find(query).exec();
      return aliments;
    } catch (error) {
      throw new Error("Error searching aliments");
    }
  }
}

module.exports = new AlimentService();
