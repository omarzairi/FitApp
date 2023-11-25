const User = require("../models/User");
const serviceProgress=require("../services/progressService");

const userService = {
  async createUser(
    data
    
  ) {
    
      const oldUser = await User.findOne({ email:data.email });
      if (oldUser) {
        throw new Error("User already exists");
      }
      const newUser = await User.create({
        data,
        date: Date.now(),
      });
      const savedUser = await newUser.save();
      await serviceProgress.createProgress({user:savedUser._id,listePoids:[{poids:savedUser.poids,date:Date.now()}]});
     
      return savedUser;
    
  },
  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email: email, password: password });
      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  },
  async getUserById(id) {
    
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    
  },
  async updateUser(
    id,
    data
    
  ) {
    
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      
      
      return await User.findByIdAndUpdate(id,data,{
      new: true,
    });
  },
  async deleteUser(id) {
    const user = await User.findById(id);
    if(!user){
      throw new Error("User not found");
    }
    return await User.findByIdAndDelete(id);
  },
  async changePassword(id, data) {
    const user= await User.findById(id);
    if(!user){
      throw new Error("User not found");
    }
    if(user.password !== data.oldPassword){
      throw new Error("Old password is incorrect");
    }
    return await User.findByIdAndUpdate(id, {password: data.newPassword}, {
      new: true,
    });
  }

};
module.exports = userService;
