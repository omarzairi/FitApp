const express = require("express");
const asyncHandler = require("express-async-handler");
const coachService = require("../services/coachService");
const jwt = require("../config/token");
const protectCoach = require("../middleware/coachAuth.js");

const coachController = express.Router();

coachController.post(
  "/addCoach",
  asyncHandler(async (req, res) => {
    const coach = await coachService.createCoach(
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.age,
      req.body.sex,
      req.body.image,
      req.body.description,
      req.body.yearsOfExperience,
      req.body.speciality,
      req.body.price,
      req.body.phoneNumber
    );

    res.status(200).json({ ...coach._doc, token: jwt(coach) });
  })
);

coachController.post(
  "/loginCoach",
  asyncHandler(async (req, res) => {
    const coach = await coachService.loginCoach(
      req.body.email,
      req.body.password
    );
    res.status(200).json({ ...coach._doc, token: jwt(coach) });
  })
);

coachController.get(
  "/getCoachById/:id",
  protectCoach,
  asyncHandler(async (req, res) => {
    const coach = await coachService.getCoachById(req.params.id);
    res.status(200).json({ ...coach._doc, token: jwt(coach) });
  })
);

coachController.put(
  "/updateCoach/:id",
  protectCoach,
  asyncHandler(async (req, res) => {
    const coach = await coachService.updateCoach(
      req.params.id,
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.age,
      req.body.sex,
      req.body.image,
      req.body.description,
      req.body.yearsOfExperience,
      req.body.speciality,
      req.body.price,
      req.body.phoneNumber
    );
    res.status(200).json(coach);
  })
);
coachController.get(
  "/getAllCoaches",
  asyncHandler(async (req, res) => {
    const coaches = await coachService.getAllCoaches();
    res.status(200).json(coaches);
  })
);
coachController.post(
  "/searchCoach",
  asyncHandler(async (req, res) => {
    try {
      const coaches = await coachService.searchCoach(req.body);
      res.status(200).json(coaches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

coachController.delete(
  "/deleteCoach/:id",
  asyncHandler(async (req, res) => {
    const result = await coachService.deleteCoach(req.params.id);
    res.status(200).json(result);
  })
);

coachController.get(
  "/loggedCoach",
  protectCoach,
  asyncHandler(async (req, res) => {
    try {
      const coach = await coachService.getCoachById(req.coach);
      res.status(200).json({ ...coach._doc });
    } catch (error) {
      res.status(400).json({ message: "Coach not found" });
    }
  })
);
coachController.put(
  "/changePassword/:id",
  protectCoach,
  asyncHandler(async (req, res) => {
    try {
      const coach = await coachService.changePassword(
        req.params.id,
        req.body.password
      );
      res.status(200).json(coach);
    } catch (error) {
      res.status(400).json({ message: "Coach not found" });
    }
  })
);
module.exports = coachController;
