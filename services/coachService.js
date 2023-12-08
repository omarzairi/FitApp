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
  async getAllCoaches() {
    try {
      const coaches = await Coach.find();
      return coaches;
    } catch (error) {
      throw error;
    }
  },
  async deleteCoach(id) {
    try {
      const coach = await Coach.findById(id);
      if (!coach) {
        throw new Error("Coach not found");
      }

      await coach.remove();
      return { message: "Coach deleted successfully" };
    } catch (error) {
      throw error;
    }
  },
  async searchCoach(searchCriteria) {
    const query = {};

    if (searchCriteria.nom) {
      query.nom = { $regex: new RegExp(searchCriteria.nom, "i") };
    }
    if (searchCriteria.prenom) {
      query.prenom = { $regex: new RegExp(searchCriteria.prenom, "i") };
    }

    try {
      const coaches = await Coach.find(query).exec();
      return coaches;
    } catch (error) {
      throw new Error("Error searching coaches");
    }
  }
};

module.exports = coachService;
