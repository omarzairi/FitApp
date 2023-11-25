const express=require('express');
const asyncHandler = require("express-async-handler");
const progressController=express.Router();
const progressService=require('../services/progressService');

progressController.post('/addProgress',asyncHandler(async(req,res)=>{
    try{
        const progress=await progressService.createProgress(req.body);
    res.status(200).json(progress);
    }
    catch(error){
        res.status(400).json({message:"Progress already exists"});
    }
}));

progressController.post('/addProgressToAUser/:id',asyncHandler(async(req,res)=>{
    try{
        const progress=await progressService.addProgressToAUser(req.params.id,req.body);
    res.status(200).json(progress);
    }
    catch(error){
        res.status(400).json({message:"Progress not found"});
    }
}));

progressController.get('/getProgressByUserId/:id',asyncHandler(async(req,res)=>{
    try{
        const progress=await progressService.getProgressByUserId(req.params.id);
    res.status(200).json(progress);
    }
    catch(error){
        res.status(400).json({message:"Progress not found"});
    }
}));

progressController.get('/getAllProgress',asyncHandler(async(req,res)=>{
    try{
        const progress=await progressService.getAllProgress();
    res.status(200).json(progress);
    }
    catch(error){
        res.status(400).json({message:"Progress not found"});
    }
}
));

progressController.put('/updateProgress/:id',asyncHandler(async(req,res)=>{
    try{
        const progress=await progressService.updateProgress(req.params.id,req.body);
    res.status(200).json(progress);
    }
    catch(error){
        res.status(400).json({message:"Progress not found"});
    }
}));

module.exports=progressController;