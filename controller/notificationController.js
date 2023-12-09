const express=require('express');
const protectUser = require("../middleware/userAuth.js");
const notificationController=express.Router();
const NotificationService=require('../services/notificaitonService.js');
notificationController.post('/',protectUser,async(req,res)=>{
    
        const notification=await NotificationService.createNotification(req.body);
    res.status(200).json(notification);
    
    
    
});
notificationController.get('/:id',protectUser,async(req,res)=>{
    const notification=await NotificationService.getNotificationByUserId(req.params.id);
    res.send(notification);
});
module.exports=notificationController;