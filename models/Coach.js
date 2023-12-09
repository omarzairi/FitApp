const mongoose= require('mongoose');
const coachSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            
        },
        prenom: {
            type: String,
            required: true,
            
        },
        email: {
            type: String,
            required: true,
            
        },
        password: {
            type: String,
            required: true,
            
        },
        sex:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true,
            
        },
        image:{
            type:String,
            
        },
        description:{
            type:String,
            
        },
        yearsOfExperience:{
            type:Number,
            
        },
        speciality:{
            type:String,
            
        },
        price:{
            type:Number,
            
        },
        phoneNumber:{
            type:Number,
            
        }
    }
    
);
const Coach = mongoose.model('Coach', coachSchema);
module.exports=Coach;

