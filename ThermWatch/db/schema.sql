-- SQLite schema for ThermWatch database

-- Drop tables if they already exist to avoid conflicts
DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS Plant;
DROP TABLE IF EXISTS Asset;
DROP TABLE IF EXISTS Sensor;

-- Create Company table
CREATE TABLE Company (
    CompanyID INTEGER PRIMARY KEY AUTOINCREMENT,
    CompanyName TEXT NOT NULL,
    Address TEXT NOT NULL,
    City TEXT NOT NULL,
    StateProvince TEXT NOT NULL,
    Country TEXT NOT NULL,
    ZipPostalCode TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Email TEXT NOT NULL
);

-- Create Plant table
CREATE TABLE Plant (
    PlantID INTEGER PRIMARY KEY AUTOINCREMENT,
    PlantName TEXT NOT NULL,
    Address TEXT NOT NULL,
    City TEXT NOT NULL,
    StateProvince TEXT NOT NULL,
    Country TEXT NOT NULL,
    ZipPostalCode TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Email TEXT NOT NULL,
    CompanyID INTEGER,
    FOREIGN KEY (CompanyID) REFERENCES Company (CompanyID) ON DELETE CASCADE
);

-- Create Asset table
CREATE TABLE Asset (
    AssetID INTEGER PRIMARY KEY AUTOINCREMENT,
    AssetName TEXT NOT NULL,
    PlantID INTEGER,
    Capacity REAL,
    Rating REAL,
    TemperatureThreshold REAL,
    FOREIGN KEY (PlantID) REFERENCES Plant (PlantID) ON DELETE CASCADE
);

-- Create Sensor table
CREATE TABLE Sensor (
    SensorID INTEGER PRIMARY KEY AUTOINCREMENT,
    SensorName TEXT NOT NULL,
    SensorFamily TEXT NOT NULL,
    SensorType TEXT NOT NULL,
    SensorVariant TEXT NOT NULL,
    AssetID INTEGER,
    Position INTEGER,
    FOREIGN KEY (AssetID) REFERENCES Asset (AssetID) ON DELETE CASCADE
);

-- Create TemperatureData table to store temperature readings
CREATE TABLE TemperatureData (
    DataID INTEGER PRIMARY KEY AUTOINCREMENT,
    SensorID INTEGER,
    Temperature REAL NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SensorID) REFERENCES Sensor (SensorID) ON DELETE CASCADE
);

-- Create AlarmLog table to store alarm events
CREATE TABLE AlarmLog (
    AlarmID INTEGER PRIMARY KEY AUTOINCREMENT,
    SensorID INTEGER,
    AlarmStatus TEXT NOT NULL,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SensorID) REFERENCES Sensor (SensorID) ON DELETE CASCADE
);