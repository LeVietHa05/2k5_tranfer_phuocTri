import better_sqlite3 from 'better-sqlite3';

// Initialize the database
const db = better_sqlite3('sensorData.db');

// Create a table for sensor data if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS sensor_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salinity REAL,
    pH REAL,
    turbidity REAL,
    temperature REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
