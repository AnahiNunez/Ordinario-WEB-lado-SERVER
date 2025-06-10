const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./biblioteca.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS libros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alumno TEXT NOT NULL,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    grupo TEXT NOT NULL
  )`);
});

module.exports = db;
