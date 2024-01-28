const UserWorklist = require('../models/UserWorklist.js');
const Workout = require('../models/workout');
class WorkoutService{

    async createWorkout(workoutData){
        const newWorkout = new Workout(workoutData);
        return await newWorkout.save();
    }

    async getAllWorkouts(){
        const workouts = await Workout.find();
        return workouts;
    }

    async createWorkoutList(userId,workoutId){
        userId = userId.toString();
        const newWorkoutList = new UserWorklist({
            user:userId,worklist:[workoutId]
        });
        await newWorkoutList.save();
    }

    async addWorkoutToList(userId,workoutId){
        const userWorkList = await UserWorklist.findOne({user:userId});
        if(!userWorkList){
            return this.createWorkoutList(userId,workoutId);
        }
        if(!userWorkList.worklist.includes(workoutId)){
            userWorkList.worklist.push(workoutId);
            await userWorkList.save();
        }
        return userWorkList;
    }

    async getUserWorklist(userId){
        const userWorkList = await UserWorklist.findOne({user:userId}).populate('worklist');
        if(!userWorkList){
            throw new Error("Workout List not found");
        }
        return userWorkList;
    }
    
    async deleteWorkoutFromList(userId,workoutId){
        const userWorkList = await UserWorklist.findOne({user:userId});
        if(!userWorkList){
            throw new Error("Workout List not found");
        }
       const workoutIndex = userWorkList.worklist.indexOf(workoutId);
         if(workoutIndex === -1){
              throw new Error("Workout not found in list");
         }
            userWorkList.worklist.splice(workoutIndex,1);
            await userWorkList.save();
            return userWorkList;
    }

    async searchWorkout(searchCriteria) {
        const query = {};
    
        if (searchCriteria.name) {
          query.name = { $regex: new RegExp(searchCriteria.name, "i") };
        }
        if (searchCriteria.category){
          query.category = {
            $regex: new RegExp(searchCriteria.category, "i"),
          }
        }
        try {
          const workouts = await Workout.find(query).exec();
          return workouts;
        } catch (error) {
          throw new Error("Error searching aliments");
        }
      }


}
module.exports = new WorkoutService();