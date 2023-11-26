const asyncHandler = require("express-async-handler");
const personalizedMealService = require("../services/personalizedMealService");
const express = require("express");
const protectUser = require("../middleware/userAuth.js");

const personalizedMealController = express.Router();

personalizedMealController.get(
  "/",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const personalizedMeal =
        await personalizedMealService.getPersonalizedMealByUser(req.user._id);
      res.status(200).json(personalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

personalizedMealController.get(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const personalizedMeal =
        await personalizedMealService.getPersonalizedMealById(req.params.id);
      res.status(200).json(personalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

personalizedMealController.post(
  "/",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const newPersonalizedMeal =
        await personalizedMealService.createPersonalizedMeal({
          user: req.user._id,
          aliments: req.body.aliments,
          name: req.body.name,
        });
      res.status(201).json(newPersonalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

personalizedMealController.put(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const updatedPersonalizedMeal =
        await personalizedMealService.updatePersonalizedMeal(
          req.params.id,
          req.body
        );
      res.status(200).json(updatedPersonalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

personalizedMealController.delete(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const deletedPersonalizedMeal =
        await personalizedMealService.deletePersonalizedMeal(req.params.id);
      res.status(200).json(deletedPersonalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

personalizedMealController.post(
  "/addAliment/:mealId/:alimentId",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const updatedPersonalizedMeal =
        await personalizedMealService.addAlimentToMeal(
          req.params.mealId,
          req.params.alimentId
        );
      res.status(200).json(updatedPersonalizedMeal);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = personalizedMealController;
