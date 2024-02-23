const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the path for the database file
const dbPath = path.resolve(__dirname, 'db.sqlite');

// Create a new database instance
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Function to initialize the database with tables for company, plant, asset, and sensor profiles
function initializeDatabase() {
  // SQL statements to create tables
  const companyTable = `
    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state_province TEXT NOT NULL,
      country TEXT NOT NULL,
      zip_postal_code TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      email TEXT NOT NULL
    );`;

  const plantTable = `
    CREATE TABLE IF NOT EXISTS plant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      state_province TEXT NOT NULL,
      country TEXT NOT NULL,
      zip_postal_code TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      email TEXT NOT NULL,
      company_id INTEGER,
      FOREIGN KEY (company_id) REFERENCES company (id)
    );`;

  const assetTable = `
    CREATE TABLE IF NOT EXISTS asset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      plant_id INTEGER NOT NULL,
      capacity REAL,
      rating REAL,
      temperature_threshold REAL,
      FOREIGN KEY (plant_id) REFERENCES plant (id)
    );`;

  const sensorTable = `
    CREATE TABLE IF NOT EXISTS sensor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sensor_family TEXT NOT NULL,
      sensor_type TEXT NOT NULL,
      sensor_variant TEXT NOT NULL,
      asset_id INTEGER NOT NULL,
      position INTEGER NOT NULL,
      FOREIGN KEY (asset_id) REFERENCES asset (id)
    );`;

  // Execute the SQL statements to create tables
  db.serialize(() => {
    db.run(companyTable)
      .run(plantTable)
      .run(assetTable)
      .run(sensorTable, (error) => {
        if (error) {
          console.error('Error creating tables:', error.message);
        } else {
          console.log('Tables created successfully.');
        }
      });
  });
}

// Export the database instance for use in other modules
module.exports = db;