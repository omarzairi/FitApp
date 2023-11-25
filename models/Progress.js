const mongoose=require('mongoose');
const ProgressSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    listePoids:[{
        poids:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        }
    }],
});
const Progress=mongoose.model("Progress",ProgressSchema);
module.exports=Progress;