const PersonalizedMeal = require("../models/PersonalizedMeal");
const Aliment = require("../models/Aliment");

class PersonalizedMealService {
  async createPersonalizedMeal(mealData) {
    const newMeal = new PersonalizedMeal(mealData);
    return await newMeal.save();
  }

  async getPersonalizedMealById(mealId) {
    return await PersonalizedMeal.findById(mealId).populate("aliments");
  }

  async getAllPersonalizedMeals() {
    return await PersonalizedMeal.find().populate("aliments");
  }
  async getPersonalizedMealByUser(user) {
    return await PersonalizedMeal.find({ user: user }).populate("aliments");
  }

  async updatePersonalizedMeal(mealId, mealData) {
    return await PersonalizedMeal.findByIdAndUpdate(mealId, mealData, {
      new: true,
    }).populate("aliments");
  }

  async deletePersonalizedMeal(mealId) {
    return await PersonalizedMeal.findByIdAndRemove(mealId);
  }

  async addAlimentToMeal(mealId, alimentId) {
    const aliment = await Aliment.findById(alimentId);
    if (!aliment) {
      throw new Error("Aliment not found");
    }

    const meal = await PersonalizedMeal.findById(mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }

    meal.aliments.push(aliment);
    await meal.save();

    return meal;
  }
}

module.exports = new PersonalizedMealService();
