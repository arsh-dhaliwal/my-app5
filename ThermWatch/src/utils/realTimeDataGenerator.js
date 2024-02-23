const { SensorModel } = require('../models/sensorModel');
const { db } = require('../db/init_db');

/**
 * Generates real-time temperature data for each sensor and stores it in the database.
 * This function simulates the real-time data acquisition from sensors.
 */
function generateRealTimeData() {
  setInterval(async () => {
    try {
      // Fetch all sensors from the database
      const sensors = await SensorModel.findAll();

      // Iterate over each sensor to generate and store temperature data
      for (const sensor of sensors) {
        // Generate a random temperature value for the sensor
        const temperature = generateRandomTemperature(sensor.temperatureThreshold);

        // Create a new temperature record in the database
        const sql = `INSERT INTO temperature_data (sensorId, temperature, timestamp) VALUES (?, ?, ?)`;
        const timestamp = new Date().toISOString();
        await db.run(sql, [sensor.id, temperature, timestamp]);

        // Emit the new temperature data to the dashboard (to be implemented with WebSocket or similar)
        // emitTemperatureData(sensor.id, temperature, timestamp);
      }
    } catch (error) {
      console.error('Error generating real-time data:', error);
    }
  }, 1000 * 60); // Generate data every minute
}

/**
 * Generates a random temperature value based on the sensor's threshold.
 * @param {number} threshold - The temperature threshold for the sensor.
 * @returns {number} - The generated temperature value.
 */
function generateRandomTemperature(threshold) {
  // Generate a random temperature around the threshold (for simulation purposes)
  const min = threshold - 5;
  const max = threshold + 5;
  return Math.random() * (max - min) + min;
}

/**
 * Placeholder function to emit temperature data to the dashboard.
 * This should be replaced with actual implementation using WebSocket or similar technology.
 * @param {number} sensorId - The ID of the sensor.
 * @param {number} temperature - The temperature value.
 * @param {string} timestamp - The timestamp of the temperature reading.
 */
function emitTemperatureData(sensorId, temperature, timestamp) {
  // Implementation for emitting data to the dashboard
  // This could be done using WebSocket, Socket.IO, or any real-time communication library
  console.log(`Sensor ID: ${sensorId}, Temperature: ${temperature}, Timestamp: ${timestamp}`);
}

module.exports = {
  generateRealTimeData
};