const mongoose= require('mongoose');
const userSchema = mongoose.Schema(
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
        sexe:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true,
            
        },
        poids:{
            type:Number,
            required:true,
            
            
        },
        taille:{
            type:Number,
            required:true,
            
            
        },
        date: {
            type: Date,
            default: Date.now
        },
        
    }
    
);
const User = mongoose.model('User', userSchema);
module.exports=User;

