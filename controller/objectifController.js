const express=require('express');
const ObjectifController=express.Router();
const async_handler=require('express-async-handler');
const ObjectifService=require('../services/objectifService');
const protectUser=require('../middleware/userAuth');

ObjectifController.post('/addObjectif',protectUser,async_handler(async(req,res)=>{
    const objectif=await ObjectifService.createObjectif(req.body);
    res.status(200).json(objectif);
}));

ObjectifController.get('/getObjectifByUserId/:id',protectUser,async_handler(async(req,res)=>{
    const objectif=await ObjectifService.getObjectifByUserId(req.params.id);
    res.status(200).json(objectif);
}));
module.exports=ObjectifController;