document.addEventListener('DOMContentLoaded', function() {
    const demoModeButton = document.getElementById('demoMode');
    demoModeButton.addEventListener('click', activateDemoMode);
});

function activateDemoMode() {
    // Generate mock data for company, plant, asset, and sensor profiles
    mockDataGenerator.generateCompanyProfile();
    mockDataGenerator.generatePlantProfiles();
    mockDataGenerator.generateAssetProfiles();
    mockDataGenerator.generateSensorProfiles();

    // Generate historic sensor data from 2018 to present
    historicDataGenerator.generateHistoricData();

    // Start generating real-time sensor data and storing it in the database
    realTimeDataGenerator.startRealTimeDataGeneration();

    // Update the dashboard with the generated mock data
    updateDashboardWithMockData();
}

function updateDashboardWithMockData() {
    // Fetch the mock data from the database
    const mockSensorData = mockDataGenerator.getMockSensorData();

    // Update the dashboard cards with the current temperature and alarm status
    mockSensorData.forEach(sensor => {
        const sensorCard = document.querySelector(`#sensor-${sensor.id}`);
        sensorCard.querySelector('.temperature').textContent = sensor.currentTemperature;
        sensorCard.querySelector('.status').textContent = sensor.alarmStatus;
        sensorCard.style.backgroundColor = getAlarmStatusColor(sensor.alarmStatus);
    });

    // Update the charts with the mock sensor data
    createChart('temperatureChart', mockSensorData);
    createChart('polarTrendPlot', mockSensorData);
    createChart('historicTrendPlot', mockSensorData);
}

function getAlarmStatusColor(status) {
    switch (status) {
        case 'good':
            return 'green';
        case 'attention':
            return 'yellow';
        case 'intervention':
            return 'red';
        default:
            return 'transparent';
    }
}