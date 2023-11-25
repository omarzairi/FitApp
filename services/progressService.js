const Progress=require('../models/Progress');
const progressService={
    async createProgress(progressData){
        const newProgress= Progress.create(progressData);
        return await newProgress.save();
    },
    async addProgressToAUser(userId,progressData){
        const progress=await Progress.findOne({user:userId});
        if(progress!=null){
            progress.listePoids.push(progressData);
            return await progress.save();
        }else{
            throw new Error("Progress not found");
        }
    },
    async getProgressByUserId(userId){
        const progress=await Progress.findOne({user:userId});
        if(!progress){
            throw new Error("Progress not found");
        }
        return progress;
    },
    async getAllProgress(){
        const progress=await Progress.find();
        return progress.map(progress=>progress.toObject());
    },
    async updateProgress(userId,updatedData){
        return await Progress.findOneAndUpdate({user:userId},updatedData,{new:true,useFindAndModify:false});
    }
}
module.exports=progressService;