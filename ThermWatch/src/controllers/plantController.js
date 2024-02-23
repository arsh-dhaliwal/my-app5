const PlantModel = require('../models/plantModel');
const db = require('../db/init_db');

const plantController = {
  // Create a new plant profile
  createPlant: async (req, res) => {
    try {
      const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;
      const newPlant = await PlantModel.create({
        name,
        address,
        city,
        state,
        country,
        zipCode,
        phoneNumber,
        email
      });
      res.status(201).json(newPlant);
    } catch (error) {
      res.status(500).json({ message: "Error creating plant profile", error: error.message });
    }
  },

  // Retrieve all plant profiles
  getAllPlants: async (req, res) => {
    try {
      const plants = await PlantModel.findAll();
      res.status(200).json(plants);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving plant profiles", error: error.message });
    }
  },

  // Retrieve a single plant profile by ID
  getPlantById: async (req, res) => {
    try {
      const { id } = req.params;
      const plant = await PlantModel.findByPk(id);
      if (plant) {
        res.status(200).json(plant);
      } else {
        res.status(404).json({ message: "Plant profile not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving plant profile", error: error.message });
    }
  },

  // Update a plant profile
  updatePlant: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, city, state, country, zipCode, phoneNumber, email } = req.body;
      const updatedPlant = await PlantModel.update({
        name,
        address,
        city,
        state,
        country,
        zipCode,
        phoneNumber,
        email
      }, {
        where: { id }
      });
      if (updatedPlant) {
        res.status(200).json({ message: "Plant profile updated successfully" });
      } else {
        res.status(404).json({ message: "Plant profile not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating plant profile", error: error.message });
    }
  },

  // Delete a plant profile
  deletePlant: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlant = await PlantModel.destroy({
        where: { id }
      });
      if (deletedPlant) {
        res.status(200).json({ message: "Plant profile deleted successfully" });
      } else {
        res.status(404).json({ message: "Plant profile not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting plant profile", error: error.message });
    }
  }
};

module.exports = plantController;