// Dashboard.js - This script handles the dashboard functionality of ThermWatch

// Function to update the dashboard with the latest temperature data
function updateDashboard() {
  // Fetch the latest temperature data from the server
  fetch('/api/temperature/latest')
    .then(response => response.json())
    .then(data => {
      // Update the temperature cards with the latest data
      const temperatureCards = document.querySelectorAll('.temperature-card');
      temperatureCards.forEach((card, index) => {
        if (data[index]) {
          card.querySelector('.temperature-value').textContent = `${data[index].temperature}°`;
          card.querySelector('.status-indicator').style.backgroundColor = getAlarmStatusColor(data[index].status);
        }
      });

      // Update the real-time temperature chart
      updateRealTimeChart(data);
    })
    .catch(error => console.error('Error fetching temperature data:', error));
}

// Function to get the color based on the alarm status
function getAlarmStatusColor(status) {
  switch (status) {
    case 'good':
      return 'green';
    case 'attention':
      return 'yellow';
    case 'intervention':
      return 'red';
    default:
      return 'grey';
  }
}

// Function to initialize the real-time temperature chart
function initializeRealTimeChart() {
  const ctx = document.getElementById('temperatureChart').getContext('2d');
  window.realTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Time labels will be dynamically updated
      datasets: [] // Sensor data sets will be dynamically added
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'minute'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Function to update the real-time temperature chart with new data
function updateRealTimeChart(data) {
  if (window.realTimeChart) {
    // Update the chart datasets with the new temperature data
    data.forEach(sensorData => {
      let dataset = window.realTimeChart.data.datasets.find(ds => ds.label === sensorData.sensorName);
      if (dataset) {
        dataset.data.push({ x: new Date(), y: sensorData.temperature });
      } else {
        // If the dataset for the sensor doesn't exist, create a new one
        window.realTimeChart.data.datasets.push({
          label: sensorData.sensorName,
          data: [{ x: new Date(), y: sensorData.temperature }],
          fill: false,
          borderColor: getRandomColor() // Assign a random color for the new sensor dataset
        });
      }
    });

    // Update the chart
    window.realTimeChart.update();
  }
}

// Function to generate a random color for the chart datasets
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to toggle between Fahrenheit and Celsius
function toggleTemperatureUnit(unit) {
  // TODO: Implement the logic to convert the temperature values and update the UI accordingly
}

// Event listeners for UI interactions
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the dashboard components
  initializeRealTimeChart();
  updateDashboard();

  // Set up event listeners for temperature unit toggle
  document.getElementById('toggleTempUnit').addEventListener('change', (event) => {
    toggleTemperatureUnit(event.target.value);
  });
});

// Call the updateDashboard function at a regular interval to refresh the data
setInterval(updateDashboard, 30000); // Update every 30 seconds

// Note: This script assumes that the server provides an API endpoint at '/api/temperature/latest'
// to fetch the latest temperature data. The actual implementation of this API endpoint is not
// included in this script and should be handled server-side.