const Coach = require("../models/Coach");

const coachService = {
  async createCoach(nom, prenom, email, password, age, sex, image) {
    try {
      const oldCoach = await Coach.findOne({ email });
      if (oldCoach) {
        throw new Error("Coach already exists");
      }

      const newCoach = await Coach.create({
        nom,
        prenom,
        email,
        password,
        age,
        sex,
        image,
      });

      const savedCoach = await newCoach.save();
      return savedCoach;
    } catch (error) {
      throw error;
    }
  },

  async loginCoach(email, password) {
    try {
      const coach = await Coach.findOne({ email, password });
      if (!coach) {
        throw new Error("Coach not found");
      }

      return coach;
    } catch (error) {
      throw error;
    }
  },

  async getCoachById(id) {
    try {
      const coach = await Coach.findById(id);
      if (!coach) {
        throw new Error("Coach not found");
      }

      return coach;
    } catch (error) {
      throw error;
    }
  },

  async updateCoach(id, nom, prenom, email, password, age, sex, image) {
    try {
      const coach = await Coach.findById(id);
      if (!coach) {
        throw new Error("Coach not found");
      }

      coach.nom = nom;
      coach.prenom = prenom;
      coach.email = email;
      coach.password = password;
      coach.age = age;
      coach.sex = sex;
      coach.image = image;

      const savedCoach = await coach.save();
      return savedCoach;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = coachService;
