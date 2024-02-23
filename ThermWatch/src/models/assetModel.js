const { DataTypes } = require('sequelize');
const db = require('../db/init_db');

const Asset = db.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plantId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Plants',
      key: 'id'
    }
  },
  capacity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  temperatureThreshold: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'assets'
});

module.exports = Asset;