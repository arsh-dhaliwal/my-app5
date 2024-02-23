const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// SensorModel.js
// Defines the Sensor model and its associated operations.

class SensorModel {
  constructor(dbFilePath) {
    open({
      filename: dbFilePath,
      driver: sqlite3.Database
    }).then((db) => {
      this.db = db;
    });
  }

  async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS sensors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        family TEXT NOT NULL,
        type TEXT NOT NULL,
        variant TEXT NOT NULL,
        assetId INTEGER NOT NULL,
        position INTEGER NOT NULL,
        FOREIGN KEY (assetId) REFERENCES assets (id)
      )
    `;
    await this.db.run(sql);
  }

  async addSensor(name, family, type, variant, assetId, position) {
    const sql = `
      INSERT INTO sensors (name, family, type, variant, assetId, position)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const result = await this.db.run(sql, [name, family, type, variant, assetId, position]);
    return result.lastID;
  }

  async getSensorById(id) {
    const sql = `
      SELECT * FROM sensors WHERE id = ?
    `;
    const sensor = await this.db.get(sql, [id]);
    return sensor;
  }

  async getAllSensors() {
    const sql = `
      SELECT * FROM sensors
    `;
    const sensors = await this.db.all(sql);
    return sensors;
  }

  async updateSensor(id, name, family, type, variant, assetId, position) {
    const sql = `
      UPDATE sensors
      SET name = ?, family = ?, type = ?, variant = ?, assetId = ?, position = ?
      WHERE id = ?
    `;
    const result = await this.db.run(sql, [name, family, type, variant, assetId, position, id]);
    return result.changes;
  }

  async deleteSensor(id) {
    const sql = `
      DELETE FROM sensors WHERE id = ?
    `;
    const result = await this.db.run(sql, [id]);
    return result.changes;
  }
}

module.exports = SensorModel;