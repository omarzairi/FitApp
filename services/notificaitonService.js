const NotificationModel=require('../models/Notification');
const NotificationService={
    async createNotification(notificationData){
        console.log("Processing user")
        let notification = await NotificationModel.findOne({ user: notificationData.user });
    
        if (notification) {
            console.log("User exists, updating fcmToken")
            notification.fcmToken = notificationData.fcmToken;
        } else {
            console.log("New user, creating notification")
            notification = new NotificationModel(notificationData);
        }
    
        return await notification.save();
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