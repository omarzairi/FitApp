const userService = require("../services/userService");
const asyncHandler = require("express-async-handler");
const express = require("express");
const userController = express.Router();
const jwt = require("../config/token");
const protectUser = require("../middleware/userAuth.js");
userController.post(
  "/addUser",
  asyncHandler(async (req, res) => {
    const user = await userService.createUser(
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.age,
      req.body.sex,
      req.body.poids,
      req.body.taille,
      
    );
    res.status(200).json({ ...user._doc, token: jwt(user) });
  })
);
userController.post(
  "/loginUser",
  asyncHandler(async (req, res) => {
    const user = await userService.loginUser(req.body.email, req.body.password);
    res.status(200).json({user:user,token: jwt(user)});
  })
);
userController.get(
  "/getUserById/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ ...user._doc, token: jwt(user) });
  })
);
userController.put(
  "/updateUser/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const user = await userService.updateUser(
      req.params.id,
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.age,
      req.body.sex,
      req.body.poids,
      req.body.taille,
      req.body.role
    );
    res.status(200).json(user);
  })
);
module.exports = userController;
