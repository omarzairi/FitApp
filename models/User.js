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
            
            
        },
        taille:{
            type:Number,
            
            
        },
        date: {
            type: Date,
            default: Date.now
        },
        role:
        {
            type:String,
            required:true,
        }
    }
    
);
const User = mongoose.model('User', userSchema);
module.exports=User;

