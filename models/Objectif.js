const mongoose=require('mongoose');
const ObjectifSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    poidsObj:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        
    },
    duree:{
        type:Number,
        
    },
    actPhysique:{
        type:String,
        required:true,
        enum:["Sedentary","Moderately active","Active","Very active"]
    },
    poidsParSemaine:{
        type:Number,
        required:true
    },
    calories:{
        type:Number,  
    },
});
const Objectif=mongoose.model("Objectif",ObjectifSchema);
module.exports=Objectif;
