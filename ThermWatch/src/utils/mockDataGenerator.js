const fs = require('fs');
const path = require('path');
const { db } = require('../db/init_db');
const { CompanyModel, PlantModel, AssetModel, SensorModel } = require('../models');

const mockDataGenerator = {
  generateCompanyData() {
    const companies = [
      {
        name: 'ThermoCo',
        address: '123 Heat St',
        city: 'Thermopolis',
        state_province: 'Heatland',
        country: 'Thermistan',
        zip_postal_code: '12345',
        phone_number: '123-456-7890',
        email: 'contact@thermoco.com'
      }
      // Add more mock companies as needed
    ];

    companies.forEach(company => {
      CompanyModel.create(company);
    });
  },

  generatePlantData() {
    const plants = [
      {
        name: 'Central Plant',
        address: '456 Furnace Ave',
        city: 'Thermopolis',
        state_province: 'Heatland',
        country: 'Thermistan',
        zip_postal_code: '12345',
        phone_number: '123-456-7891',
        email: 'plant@thermoco.com'
      }
      // Add more mock plants as needed
    ];

    plants.forEach(plant => {
      PlantModel.create(plant);
    });
  },

  generateAssetData() {
    const assets = [
      {
        name: 'Reactor 1',
        plant_id: 1, // Assuming plant with ID 1 exists
        capacity: '1000MW',
        rating: 'A',
        temperature_threshold: '200'
      }
      // Add more mock assets as needed
    ];

    assets.forEach(asset => {
      AssetModel.create(asset);
    });
  },

  generateSensorData() {
    const sensors = [
      {
        name: 'TempSensor 1',
        sensor_family: 'ThermoSensors',
        sensor_type: 'Temperature',
        sensor_variant: 'Type-K',
        asset_id: 1, // Assuming asset with ID 1 exists
        position: 'Top'
      }
      // Add more mock sensors as needed
    ];

    sensors.forEach(sensor => {
      SensorModel.create(sensor);
    });
  },

  generateHistoricSensorData() {
    const startDate = new Date('2018-01-01');
    const endDate = new Date();
    const sensorId = 1; // Assuming sensor with ID 1 exists
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const temperature = Math.random() * 100; // Random temperature value
      const timestamp = currentDate.toISOString();

      db.run('INSERT INTO sensor_data (sensor_id, temperature, timestamp) VALUES (?, ?, ?)', [sensorId, temperature, timestamp]);

      // Increment date by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  },

  generateRealTimeSensorData() {
    setInterval(() => {
      const sensorId = 1; // Assuming sensor with ID 1 exists
      const temperature = Math.random() * 100; // Random temperature value
      const timestamp = new Date().toISOString();

      db.run('INSERT INTO sensor_data (sensor_id, temperature, timestamp) VALUES (?, ?, ?)', [sensorId, temperature, timestamp]);
    }, 1000); // Generate data every second
  },

  runDemoMode() {
    this.generateCompanyData();
    this.generatePlantData();
    this.generateAssetData();
    this.generateSensorData();
    this.generateHistoricSensorData();
    this.generateRealTimeSensorData();
  }
};

module.exports = mockDataGenerator;