const { DataTypes } = require('sequelize');
const db = require('../db/init_db');

// Define the Plant model with its properties, adhering to the Plant Data schema
const PlantModel = db.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state_province: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip_postal_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, {
  // Additional model options
  timestamps: false,
  tableName: 'plants'
});

// Export the Plant model for use in other files
module.exports = PlantModel;