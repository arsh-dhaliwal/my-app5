// alerts.js - Handles the alerting and alarm functionality for ThermWatch

const notificationService = require('../utils/notificationService');
const emailService = require('../utils/emailService');
const { alarmConfig } = require('../config/alarmConfig.json');

// Function to check and trigger alerts based on temperature thresholds
function checkAndTriggerAlerts(sensorData) {
  sensorData.forEach(sensor => {
    const { temperature, threshold, sensorName } = sensor;
    if (temperature >= threshold) {
      triggerAlarm(sensorName, 'red');
    } else {
      // Check for yellow alert condition based on configurable percentage increase and days
      const increasePercentage = alarmConfig.yellowAlert.increasePercentage;
      const days = alarmConfig.yellowAlert.days;
      // This function should be implemented to calculate the average temperature trend
      const averageTrend = calculateAverageTemperatureTrend(sensorName, days);
      if (averageTrend >= increasePercentage) {
        triggerAlarm(sensorName, 'yellow');
      } else {
        triggerAlarm(sensorName, 'green');
      }
    }
  });
}

// Function to trigger an alarm with a specific color and status
function triggerAlarm(sensorName, status) {
  const statusColors = {
    green: 'Everything is good',
    yellow: 'Requires attention for review',
    red: 'Requires immediate intervention'
  };

  // Update UI with the alarm status color
  updateAlarmStatusUI(sensorName, status);

  // Send notification and email based on the status
  if (status === 'yellow' || status === 'red') {
    notificationService.sendNotification(`Alert for ${sensorName}: ${statusColors[status]}`);
    emailService.sendEmailAlert(`Alert for ${sensorName}`, `The sensor has triggered a ${status} alert. ${statusColors[status]}`);
  }
}

// Function to update the UI with the alarm status color
function updateAlarmStatusUI(sensorName, status) {
  const alarmElement = document.getElementById(`alarmStatus-${sensorName}`);
  if (alarmElement) {
    alarmElement.className = `alarm-status ${status}`;
    alarmElement.textContent = status.toUpperCase();
  }
}

// Function to calculate the average temperature trend for a sensor over a given number of days
// This is a placeholder function and should be implemented with the correct logic
function calculateAverageTemperatureTrend(sensorName, days) {
  // Logic to calculate the average temperature trend
  // This should interact with the database to get historical data
  // For now, we return a mock value
  return 5; // Mock value representing the percentage increase
}

// Export the functions for use in other modules
module.exports = {
  checkAndTriggerAlerts,
  triggerAlarm,
  updateAlarmStatusUI,
  calculateAverageTemperatureTrend
};