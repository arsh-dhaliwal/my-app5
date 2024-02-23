const db = require('../db/init_db');
const AssetModel = require('../models/assetModel');

const assetController = {
  // Create a new asset
  createAsset: async (req, res) => {
    try {
      const { assetName, plantId, capacity, rating, temperatureThreshold } = req.body;
      const newAsset = await AssetModel.create({
        assetName,
        plantId,
        capacity,
        rating,
        temperatureThreshold
      });
      res.status(201).json(newAsset);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve all assets
  getAllAssets: async (req, res) => {
    try {
      const assets = await AssetModel.findAll();
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve a single asset by ID
  getAssetById: async (req, res) => {
    try {
      const { id } = req.params;
      const asset = await AssetModel.findByPk(id);
      if (asset) {
        res.status(200).json(asset);
      } else {
        res.status(404).json({ error: 'Asset not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an asset
  updateAsset: async (req, res) => {
    try {
      const { id } = req.params;
      const { assetName, plantId, capacity, rating, temperatureThreshold } = req.body;
      const updatedAsset = await AssetModel.update(
        { assetName, plantId, capacity, rating, temperatureThreshold },
        { where: { id } }
      );
      if (updatedAsset[0] > 0) {
        res.status(200).json({ message: 'Asset updated successfully' });
      } else {
        res.status(404).json({ error: 'Asset not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete an asset
  deleteAsset: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await AssetModel.destroy({ where: { id } });
      if (deleted) {
        res.status(200).json({ message: 'Asset deleted successfully' });
      } else {
        res.status(404).json({ error: 'Asset not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = assetController;