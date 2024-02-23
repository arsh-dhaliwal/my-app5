// ThermWatch/src/config/config.js

// Configuration for ThermWatch application

const path = require('path');

const config = {
  // Database configuration
  db: {
    filename: path.join(__dirname, '..', '..', 'db', 'db.sqlite'), // Path to the SQLite database file
    extension: '.tmdb', // Extension for the ThermWatch database files
  },

  // UI configuration
  ui: {
    darkModeClass: 'dark-mode', // CSS class for dark mode
    lightModeClass: 'light-mode', // CSS class for light mode
    defaultAccentColor: '#007bff', // Default blue accent color for the UI
  },

  // DAQ configuration
  daq: {
    modbusConfig: require('./modbusConfig.json'), // Modbus configuration file
    mqttConfig: require('./mqttConfig.json'), // MQTT configuration file
  },

  // Alarm configuration
  alarm: {
    statusColors: {
      green: '#28a745', // Everything is good
      yellow: '#ffc107', // Requires attention
      red: '#dc3545', // Requires immediate intervention
    },
    alarmConfig: require('./alarmConfig.json'), // Alarm configuration file
  },

  // Email service configuration
  email: require('./emailConfig.json'),

  // Demo mode configuration
  demo: require('./demoConfig.json'),

  // Application settings
  appSettings: {
    companyName: 'ThermWatch Inc.', // Default company name
    companyLogoPath: path.join(__dirname, '..', '..', 'public', 'assets', 'logo.png'), // Path to the company logo
    faviconPath: path.join(__dirname, '..', '..', 'public', 'assets', 'favicon.ico'), // Path to the favicon
  },

  // Licensing and EULA
  license: {
    licenseFilePath: path.join(__dirname, '..', '..', 'LICENSE.txt'), // Path to the LICENSE.txt file
    eulaFilePath: path.join(__dirname, '..', '..', 'EULA.txt'), // Path to the EULA.txt file
  },
};

module.exports = config;