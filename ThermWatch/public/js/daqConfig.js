// DAQ Configuration Page Script
// This script is responsible for handling the DAQ (Data Acquisition) configuration for ThermWatch.
// It allows users to configure the communication with the DAQ system using Modbus and/or MQTT protocols.

// Importing necessary utilities for Modbus and MQTT configuration
import { configureModbus, configureMQTT } from '../utils/modbus.js';
import { mqttClient } from '../utils/mqtt.js';

// Function to initialize the DAQ configuration page
function initDAQConfigPage() {
  // Retrieve the DAQ configuration form elements
  const modbusForm = document.getElementById('modbusConfigForm');
  const mqttForm = document.getElementById('mqttConfigForm');

  // Event listener for Modbus configuration form submission
  modbusForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(modbusForm);
    const modbusConfig = {
      host: formData.get('modbusHost'),
      port: formData.get('modbusPort'),
      unitId: formData.get('modbusUnitId')
    };
    configureModbus(modbusConfig);
  });

  // Event listener for MQTT configuration form submission
  mqttForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(mqttForm);
    const mqttConfig = {
      brokerUrl: formData.get('mqttBrokerUrl'),
      clientId: formData.get('mqttClientId'),
      topic: formData.get('mqttTopic')
    };
    configureMQTT(mqttConfig);
  });
}

// Function to apply Modbus configuration settings
function applyModbusConfig(config) {
  // Create a new Modbus client with the provided configuration
  const modbusClient = configureModbus(config);
  // TODO: Implement the logic to connect to the Modbus server and start data acquisition
}

// Function to apply MQTT configuration settings
function applyMQTTConfig(config) {
  // Connect to the MQTT broker with the provided configuration
  mqttClient.connect(config, (err) => {
    if (err) {
      console.error('Error connecting to MQTT broker:', err);
      return;
    }
    console.log('Connected to MQTT broker successfully.');
    // TODO: Implement the logic to subscribe to the MQTT topic and start data acquisition
  });
}

// Initialize the DAQ configuration page when the script loads
document.addEventListener('DOMContentLoaded', initDAQConfigPage);