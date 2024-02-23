const ModbusRTU = require("modbus-serial");
const { SensorModel } = require("../models/sensorModel");

// Create a Modbus client
const modbusClient = new ModbusRTU();

// Function to connect to the Modbus server
const connectModbus = async (config) => {
  try {
    await modbusClient.connectTCP(config.host, { port: config.port });
    modbusClient.setID(config.unitId);
    console.log("Connected to Modbus server.");
  } catch (error) {
    console.error("Modbus connection error:", error);
  }
};

// Function to read temperature data from a sensor
const readTemperature = async (sensorAddress, length) => {
  try {
    // Read holding registers using Modbus function 3
    const data = await modbusClient.readHoldingRegisters(sensorAddress, length);
    return data.data;
  } catch (error) {
    console.error("Modbus read error:", error);
    return null;
  }
};

// Function to update sensor data in the database
const updateSensorData = async (sensorId, temperature) => {
  try {
    await SensorModel.update({ temperature }, { where: { id: sensorId } });
    console.log(`Sensor data updated. Sensor ID: ${sensorId}, Temperature: ${temperature}`);
  } catch (error) {
    console.error("Error updating sensor data:", error);
  }
};

// Function to poll sensors and update their temperature data
const pollSensors = async (sensorsConfig) => {
  for (const sensor of sensorsConfig) {
    const temperatureData = await readTemperature(sensor.address, sensor.length);
    if (temperatureData) {
      await updateSensorData(sensor.id, temperatureData[0]); // Assuming the temperature is at the first register
    }
  }
};

module.exports = {
  modbusClient,
  connectModbus,
  readTemperature,
  updateSensorData,
  pollSensors
};