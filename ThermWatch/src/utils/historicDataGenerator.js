const fs = require('fs');
const path = require('path');
const { db } = require('../db/init_db');
const { SensorModel } = require('../models/sensorModel');

/**
 * Generates historic sensor data for demonstration purposes.
 * The data spans from the year 2018 to the current year.
 */
async function generateHistoricData() {
  try {
    const sensors = await SensorModel.findAll();
    const startDate = new Date('2018-01-01');
    const endDate = new Date();
    const historicData = [];

    for (const sensor of sensors) {
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dailyData = generateDailySensorData(sensor, currentDate);
        historicData.push(dailyData);
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      }
    }

    await saveHistoricData(historicData);
    console.log('Historic data generation complete.');
  } catch (error) {
    console.error('Error generating historic data:', error);
  }
}

/**
 * Generates random temperature data for a sensor for a given date.
 * @param {Object} sensor - The sensor object.
 * @param {Date} date - The date for which to generate data.
 * @returns {Object} - The generated sensor data for the date.
 */
function generateDailySensorData(sensor, date) {
  const minTemperature = Math.random() * 50; // Random temperature between 0 and 50
  const maxTemperature = minTemperature + Math.random() * 10; // Max temperature is always higher than min
  const avgTemperature = (minTemperature + maxTemperature) / 2;

  return {
    sensorId: sensor.id,
    date: date.toISOString().split('T')[0],
    minTemperature,
    maxTemperature,
    avgTemperature
  };
}

/**
 * Saves the generated historic data to the database.
 * @param {Array} historicData - An array of historic data objects.
 */
async function saveHistoricData(historicData) {
  const insertQuery = `INSERT INTO SensorData (sensorId, date, minTemperature, maxTemperature, avgTemperature) VALUES (?, ?, ?, ?, ?)`;

  for (const data of historicData) {
    await db.run(insertQuery, [
      data.sensorId,
      data.date,
      data.minTemperature,
      data.maxTemperature,
      data.avgTemperature
    ]);
  }
}

/**
 * Exports the function to generate historic data so it can be used elsewhere in the application.
 */
module.exports = {
  generateHistoricData
};

// Call the function to generate historic data when this script is run directly.
if (require.main === module) {
  generateHistoricData();
}