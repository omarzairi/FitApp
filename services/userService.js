const User = require("../models/User");
const userService = {
  async createUser(
    nom,
    prenom,
    email,
    password,
    age,
    sexe,
    poids,
    taille,
    role
  ) {
    try {
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
        sexe,
        poids,
        taille,
        role,
        date: Date.now(),
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
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
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  async updateUser(
    id,
    nom,
    prenom,
    email,
    password,
    age,
    sexe,
    poids,
    taille,
    role
  ) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      user.nom = nom;
      user.prenom = prenom;
      user.email = email;
      user.password = password;
      user.age = age;
      user.sexe = sexe;
      user.poids = poids;
      user.taille = taille;
      user.role = role;
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = userService;
