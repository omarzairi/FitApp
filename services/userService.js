const User = require("../models/User");
const userService = {
  async createUser(
    nom,
    prenom,
    email,
    password,
    age,
    sex,
    poids,
    taille
    
  ) {
    
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new Error("User already exists");
      }
      const newUser = await User.create({
        nom,
        prenom,
        email,
        password,
        age,
        sex,
        poids,
        taille,
        date: Date.now(),
      });
      const savedUser = await newUser.save();
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
  }
};
module.exports = userService;
