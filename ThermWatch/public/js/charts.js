// ThermWatch/public/js/charts.js

// Function to initialize the temperature chart
function initializeTemperatureChart() {
  const ctx = document.getElementById('temperatureChart').getContext('2d');
  const temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Time labels will be dynamically added
      datasets: [] // Sensor data sets will be dynamically added
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  return temperatureChart;
}

// Function to update the temperature chart with new data
function updateTemperatureChart(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset, index) => {
    dataset.data.push(data[index]);
  });
  chart.update();
}

// Function to initialize the polar trend plot
function initializePolarTrendPlot() {
  const ctx = document.getElementById('polarTrendPlot').getContext('2d');
  const polarTrendPlot = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: [], // Sensor positions will be dynamically added
      datasets: [{
        data: [], // Temperature data will be dynamically added
        backgroundColor: [] // Colors based on temperature thresholds
      }]
    },
    options: {
      scale: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  });
  return polarTrendPlot;
}

// Function to update the polar trend plot with new data
function updatePolarTrendPlot(chart, labels, data, backgroundColors) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].backgroundColor = backgroundColors;
  chart.update();
}

// Function to initialize the historic trend plot
function initializeHistoricTrendPlot() {
  const ctx = document.getElementById('historicTrendPlot').getContext('2d');
  const historicTrendPlot = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // Time labels will be dynamically added
      datasets: [] // Sensor data sets will be dynamically added
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  return historicTrendPlot;
}

// Function to update the historic trend plot with new data
function updateHistoricTrendPlot(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset, index) => {
    dataset.data.push(data[index]);
  });
  chart.update();
}

// Function to toggle the visibility of a dataset in the chart
function toggleDataset(chart, datasetIndex) {
  const dataset = chart.data.datasets[datasetIndex];
  dataset.hidden = !dataset.hidden;
  chart.update();
}

// Function to convert temperature data between Fahrenheit and Celsius
function convertTemperatureData(data, toUnit) {
  return data.map(temp => {
    if (toUnit === 'F') {
      return (temp * 9/5) + 32;
    } else {
      return (temp - 32) * 5/9;
    }
  });
}

// Function to toggle temperature unit on all charts
function toggleTemperatureUnit(charts, currentUnit, newUnit) {
  charts.forEach(chart => {
    chart.data.datasets.forEach(dataset => {
      dataset.data = convertTemperatureData(dataset.data, newUnit);
    });
    chart.update();
  });
  // Update the current unit indicator
  currentUnit = newUnit;
}

// Export the chart functions to be used in other parts of the application
export {
  initializeTemperatureChart,
  updateTemperatureChart,
  initializePolarTrendPlot,
  updatePolarTrendPlot,
  initializeHistoricTrendPlot,
  updateHistoricTrendPlot,
  toggleDataset,
  toggleTemperatureUnit
};