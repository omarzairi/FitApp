const workoutService = require("../services/workoutService");
const asyncHandler = require("express-async-handler");
const express = require("express");
const workoutController = express.Router();
const protectUser = require("../middleware/userAuth.js");


workoutController.post(
    "/:workoutId",
    protectUser,
    asyncHandler(async (req,res)=>{
        try{
            const workout = await workoutService.addWorkoutToList(req.user._id,req.params.workoutId);
            res.status(200).json(workout);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Workout not found"});
        }
    })
);

workoutController.delete(
    "/:recipeId",
    protectUser,
    asyncHandler(async (req,res)=>{
        try{
            const workout = await workoutService.deleteWorkoutFromList(req.user._id,req.params.workoutId);
            res.status(200).json(workout);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Workout not found"});
        }
    })
)

workoutController.get(
    "/",
    protectUser,
    asyncHandler(async (req,res)=>{
        try{
            const workout = await workoutService.getUserWorklist(req.user._id);
            res.status(200).json(workout);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Workout not found"});
        }
    })
)


workoutController.get(
    "/workout/all",
    asyncHandler(async (req,res)=>{
        try{
            const workouts = await workoutService.getAllWorkouts();
            res.status(200).json(workouts);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Workout not found"});
        }
    })
)

workoutController.post(
    "/search/querysearch",
    asyncHandler(async (req,res)=>{
        try{
            const workouts = await workoutService.searchWorkout(req.body);
            res.status(200).json(workouts);
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Workout not found"});
        }
    })
)

module.exports = workoutController;