const asyncHandler = require("express-async-handler");
const alimentService = require("../services/alimentService");
const express = require("express");

const alimentController = express.Router();

alimentController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const aliments = await alimentService.getAllAliments();
      res.status(200).json(aliments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

alimentController.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const aliment = await alimentService.getAlimentById(
        req.params.id.toString()
      );
      console.log(aliment);
      res.status(200).json(aliment);
    } catch (error) {
      res.status(500).json({
        message: "Aliment doesn't exist",
      });
    }
  })
);

alimentController.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const newAliment = await alimentService.createAliment(req.body);
      res.status(201).json(newAliment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

alimentController.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const updatedAliment = await alimentService.updateAliment(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedAliment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

alimentController.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await alimentService.deleteAliment(req.params.id);

      res.status(200).json({
        message: "Aliment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);


alimentController.post(
  "/search",
  asyncHandler(async (req, res) => {
    try {
      const aliments = await alimentService.searchAliment(req.body);
      res.status(200).json(aliments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = alimentController;
