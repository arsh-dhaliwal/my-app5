const SensorModel = require('../models/sensorModel');

/**
 * Calculates the daily maximum, minimum, and average temperatures for each sensor.
 * It also checks if any alarms were triggered based on the temperature threshold.
 * @param {Date} date - The date for which the calculations are to be made.
 * @returns {Promise<Array>} - A promise that resolves to an array of calculation results for each sensor.
 */
async function calculateDailyTemperatures(date) {
  try {
    // Fetch all sensor data for the given date
    const sensorsData = await SensorModel.findAll({
      where: {
        date: date
      }
    });

    // Calculate daily temperatures and alarms for each sensor
    return sensorsData.map(sensor => {
      const temperatures = sensor.temperatureReadings; // Assuming temperatureReadings is an array of temperatures for the day
      const maxTemperature = Math.max(...temperatures);
      const minTemperature = Math.min(...temperatures);
      const averageTemperature = temperatures.reduce((acc, val) => acc + val, 0) / temperatures.length;
      const isAlarmTriggered = maxTemperature >= sensor.TemperatureThreshold;

      return {
        sensorId: sensor.id,
        maxTemperature,
        minTemperature,
        averageTemperature,
        isAlarmTriggered
      };
    });
  } catch (error) {
    console.error('Error calculating daily temperatures:', error);
    throw error;
  }
}

module.exports = {
  calculateDailyTemperatures
};