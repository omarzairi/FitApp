const asyncHandler = require("express-async-handler");
const express = require("express");
const consumptionService = require('../services/consumptionService');
const consumptionController = express.Router();

consumptionController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const consumptions = await consumptionService.getAllConsumptions();
      res.status(200).json(consumptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

consumptionController.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const consumption = await consumptionService.getConsumptionById(req.params.id);
      if (!consumption) {
        res.status(404).json({
          message: "Consumption doesn't exist",
        });
      } else {
        res.status(200).json(consumption);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

consumptionController.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const newConsumption = await consumptionService.createConsumption(req.body);
      res.status(201).json(newConsumption);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

consumptionController.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const updatedConsumption = await consumptionService.updateConsumption(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedConsumption);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

consumptionController.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      await consumptionService.deleteConsumption(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = consumptionController;