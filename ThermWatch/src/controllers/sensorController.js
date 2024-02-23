const SensorModel = require('../models/sensorModel');
const temperatureCalculator = require('../utils/temperatureCalculator');
const alarmEngine = require('../utils/alarmEngine');
const notificationService = require('../utils/notificationService');
const emailService = require('../utils/emailService');

const sensorController = {
  // Function to add a new sensor
  addSensor: async (req, res) => {
    try {
      const { name, family, type, variant, assetId, position } = req.body;
      const newSensor = await SensorModel.create({
        name,
        family,
        type,
        variant,
        assetId,
        position
      });
      res.status(201).json(newSensor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Function to get all sensors
  getAllSensors: async (req, res) => {
    try {
      const sensors = await SensorModel.findAll();
      res.status(200).json(sensors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Function to get a single sensor by ID
  getSensorById: async (req, res) => {
    try {
      const sensor = await SensorModel.findByPk(req.params.id);
      if (sensor) {
        res.status(200).json(sensor);
      } else {
        res.status(404).json({ message: 'Sensor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Function to update sensor details
  updateSensor: async (req, res) => {
    try {
      const { name, family, type, variant, assetId, position } = req.body;
      const updatedSensor = await SensorModel.update(
        { name, family, type, variant, assetId, position },
        { where: { id: req.params.id } }
      );
      if (updatedSensor) {
        res.status(200).json({ message: 'Sensor updated successfully' });
      } else {
        res.status(404).json({ message: 'Sensor not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Function to delete a sensor
  deleteSensor: async (req, res) => {
    try {
      const sensor = await SensorModel.destroy({ where: { id: req.params.id } });
      if (sensor) {
        res.status(200).json({ message: 'Sensor deleted successfully' });
      } else {
        res.status(404).json({ message: 'Sensor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Function to record temperature data from a sensor
  recordTemperatureData: async (sensorId, temperature) => {
    try {
      const sensor = await SensorModel.findByPk(sensorId);
      if (sensor) {
        // Calculate daily temperature metrics
        const { max, min, avg } = temperatureCalculator.calculateDailyTemperatures(temperature);
        // Check for alarms and trigger if necessary
        const alarmStatus = alarmEngine.checkForAlarms(sensor, max, min, avg);
        if (alarmStatus) {
          notificationService.sendNotification(alarmStatus);
          emailService.sendEmailAlert(alarmStatus);
        }
        // Save temperature data to the database
        // This is a placeholder for the actual database save operation
        // await TemperatureDataModel.create({ sensorId, max, min, avg, alarmStatus });
      }
    } catch (error) {
      console.error('Error recording temperature data:', error.message);
    }
  }
};

module.exports = sensorController;