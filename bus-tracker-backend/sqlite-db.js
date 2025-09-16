
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'bus_tracker.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const sql = fs.readFileSync(path.resolve(process.cwd(), 'migrations/init.sql'), 'utf8');
  db.exec(sql, (err) => {
    if (err) {
      console.error('Error initializing database:', err.message);
    } else {
      console.log('Database initialized successfully.');
    }
  });
}

export default db;
