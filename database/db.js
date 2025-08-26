import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database/notes.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    updated TEXT NOT NULL
  )`);
});

export default db;
