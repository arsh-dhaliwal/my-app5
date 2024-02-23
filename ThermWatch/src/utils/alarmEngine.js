const emailService = require('./emailService');
const notificationService = require('./notificationService');
const { SensorModel } = require('../models/sensorModel');
const alarmConfig = require('../config/alarmConfig.json');

class AlarmEngine {
  constructor() {
    this.yellowAlertThreshold = alarmConfig.yellowAlertThreshold || 10; // X% increase
    this.yellowAlertDays = alarmConfig.yellowAlertDays || 7; // Y days
    this.statusColors = {
      green: 'Everything is good',
      yellow: 'Requires attention',
      red: 'Requires immediate intervention'
    };
  }

  async checkTemperatureThreshold(sensorId, currentTemperature) {
    try {
      const sensor = await SensorModel.findById(sensorId);
      if (!sensor) {
        throw new Error(`Sensor with ID ${sensorId} not found`);
      }

      if (currentTemperature >= sensor.temperatureThreshold) {
        this.triggerAlarm(sensor, currentTemperature, 'red');
      } else {
        const averageIncrease = await this.calculateAverageIncrease(sensorId);
        if (averageIncrease >= this.yellowAlertThreshold) {
          this.triggerAlarm(sensor, currentTemperature, 'yellow');
        } else {
          this.triggerAlarm(sensor, currentTemperature, 'green');
        }
      }
    } catch (error) {
      console.error('Error checking temperature threshold:', error);
    }
  }

  async calculateAverageIncrease(sensorId) {
    // This function should calculate the average temperature increase over the last Y days
    // and return the percentage increase. For now, it returns a mock value.
    // TODO: Implement the actual logic to calculate the average temperature increase.
    return 5; // Mock value
  }

  triggerAlarm(sensor, currentTemperature, status) {
    const statusMessage = this.statusColors[status];
    console.log(`Alarm triggered for sensor ${sensor.name}: ${statusMessage}`);

    // Send notification to the user
    notificationService.sendNotification(`Alarm for ${sensor.name}: ${statusMessage}`);

    // Send email alert if the status is red
    if (status === 'red') {
      emailService.sendEmailAlert(sensor, currentTemperature);
    }

    // TODO: Add additional alarm handling logic as required.
  }

  // Method to configure the alarm engine thresholds
  configureThresholds(newYellowAlertThreshold, newYellowAlertDays) {
    this.yellowAlertThreshold = newYellowAlertThreshold;
    this.yellowAlertDays = newYellowAlertDays;
  }
}

module.exports = new AlarmEngine();