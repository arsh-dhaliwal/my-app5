const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes/api');
const { initializeDatabase } = require('./db/init_db');
const { notificationService } = require('./src/utils/notificationService');
const { emailService } = require('./src/utils/emailService');
const { mockDataGenerator } = require('./src/utils/mockDataGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use API routes
app.use('/api', apiRoutes);

// Initialize the database
initializeDatabase().then(() => {
  console.log('Database initialized successfully.');
}).catch((error) => {
  console.error('Error initializing the database:', error);
});

// Notification and email services initialization
notificationService.initialize();
emailService.initialize();

// Generate mock data if in demo mode
if (process.env.DEMO_MODE === 'true') {
  mockDataGenerator.generate();
}

// Start the server
app.listen(PORT, () => {
  console.log(`ThermWatch server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Redirect all other requests to the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export the app for testing purposes
module.exports = app;