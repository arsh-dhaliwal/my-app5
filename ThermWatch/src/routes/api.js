const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController');
const plantController = require('../controllers/plantController');
const assetController = require('../controllers/assetController');
const sensorController = require('../controllers/sensorController');
const temperatureCalculator = require('../utils/temperatureCalculator');
const alarmEngine = require('../utils/alarmEngine');
const mockDataGenerator = require('../utils/mockDataGenerator');

// Company routes
router.get('/company', companyController.getAllCompanies);
router.post('/company', companyController.createCompany);
router.put('/company/:id', companyController.updateCompany);
router.delete('/company/:id', companyController.deleteCompany);

// Plant routes
router.get('/plant', plantController.getAllPlants);
router.post('/plant', plantController.createPlant);
router.put('/plant/:id', plantController.updatePlant);
router.delete('/plant/:id', plantController.deletePlant);

// Asset routes
router.get('/asset', assetController.getAllAssets);
router.post('/asset', assetController.createAsset);
router.put('/asset/:id', assetController.updateAsset);
router.delete('/asset/:id', assetController.deleteAsset);

// Sensor routes
router.get('/sensor', sensorController.getAllSensors);
router.post('/sensor', sensorController.createSensor);
router.put('/sensor/:id', sensorController.updateSensor);
router.delete('/sensor/:id', sensorController.deleteSensor);

// Temperature data and calculations
router.get('/temperature/daily', temperatureCalculator.getDailyTemperatureData);
router.post('/temperature/calculate', temperatureCalculator.calculateDailyTemperatures);

// Alarm routes
router.get('/alarms', alarmEngine.getAlarms);
router.post('/alarms/configure', alarmEngine.configureAlarmEngine);

// Mock data generation for demo mode
router.post('/demo/generate', mockDataGenerator.generateMockData);

module.exports = router;