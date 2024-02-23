Shared Dependencies:

**Exported Variables:**
- `db`: The database instance exported from `init_db.js`.
- `CompanyModel`, `PlantModel`, `AssetModel`, `SensorModel`: Models exported from their respective files in `src/models/`.
- `companyController`, `plantController`, `assetController`, `sensorController`: Controllers exported from their respective files in `src/controllers/`.
- `modbusClient`, `mqttClient`: Clients exported from `modbus.js` and `mqtt.js` in `src/utils/`.
- `temperatureCalculator`: Exported from `temperatureCalculator.js` in `src/utils/`.
- `alarmEngine`: Exported from `alarmEngine.js` in `src/utils/`.
- `emailService`: Exported from `emailService.js` in `src/utils/`.
- `notificationService`: Exported from `notificationService.js` in `src/utils/`.
- `mockDataGenerator`, `historicDataGenerator`, `realTimeDataGenerator`: Exported from their respective files in `src/utils/`.

**Data Schemas:**
- `companySchema`: Schema for company profile data.
- `plantSchema`: Schema for plant profile data.
- `assetSchema`: Schema for asset profile data.
- `sensorSchema`: Schema for sensor profile data.

**ID Names of DOM Elements:**
- `#dashboard`: Main dashboard page element.
- `#settings`: Settings page element.
- `#daqConfig`: DAQ configuration page element.
- `#alerts`: Alerts and alarms page element.
- `#demoMode`: Demo mode button element.
- `#toggleDarkMode`: Button to toggle dark mode.
- `#toggleLightMode`: Button to toggle light mode.
- `#temperatureChart`: Chart element for temperature data.
- `#polarTrendPlot`: Polar trend plot element.
- `#historicTrendPlot`: Historic trend plot element.
- `#realTimeData`: Real-time data cards container.
- `#companyTab`, `#plantTab`, `#assetTab`, `#sensorTab`: Tabs in the settings popup.

**Message Names:**
- `temperatureData`: Message name for temperature data updates.
- `alarmStatus`: Message name for alarm status updates.
- `sensorDataUpdate`: Message name for sensor data updates.

**Function Names:**
- `initializeDatabase`: Function to set up the database.
- `saveDatabaseState`: Function to save the current state of the database.
- `importDatabase`: Function to import a database.
- `calculateDailyTemperatures`: Function to calculate daily temperature metrics.
- `configureAlarmEngine`: Function to configure the alarm engine.
- `sendNotification`: Function to send system notifications.
- `sendEmailAlert`: Function to send email alerts.
- `generateMockData`: Function to generate mock data for demo mode.
- `updateDashboard`: Function to update the dashboard UI with new data.
- `toggleTemperatureUnit`: Function to toggle between Fahrenheit and Celsius.
- `createChart`: Function to create and update charts with Chart.js.
- `configureModbus`: Function to configure Modbus communication.
- `configureMQTT`: Function to configure MQTT communication.

These shared dependencies will be used across multiple files to ensure consistency and functionality throughout the application.