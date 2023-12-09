const mongoose=require('mongoose');
const NotificationSchema= mongoose.Schema({
    fcmToken:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
       
    }
    
});
const NotificationModel=mongoose.model('Notification',NotificationSchema);
module.exports=NotificationModel;