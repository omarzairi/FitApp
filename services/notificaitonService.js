const NotificationModel=require('../models/Notification');
const NotificationService={
    async createNotification(notificationData){
        
        console.log("new user")
        const newNotification=await NotificationModel.create(notificationData);
        return await newNotification.save();
    },
    async getNotificationByUserId(userId){
        const notification=await NotificationModel.findOne({user:userId});
        if(!notification){
            throw new Error("Notification not found");
        }
        return notification;
    }

}
module.exports=NotificationService;