const mongoose = require('mongoose');
const userWorklistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    worklist: 
    [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Workout',
                required: true,
            },
            
    ],
});
const UserWorklist = mongoose.model('UserWorklist', userWorklistSchema);
module.exports = UserWorklist;