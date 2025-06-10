const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los libros
router.get('/', (req, res) => {
  db.all("SELECT * FROM libros", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener un libro por ID
router.get('/:id', (req, res) => {
  db.get("SELECT * FROM libros WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Agregar un nuevo libro
router.post('/', (req, res) => {
  const { alumno, titulo, autor, grupo } = req.body;
  db.run("INSERT INTO libros (alumno, titulo, autor, grupo) VALUES (?, ?, ?, ?)", 
    [alumno, titulo, autor, grupo], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, alumno, titulo, autor, grupo });
    });
});

// Actualizar un libro
router.put('/:id', (req, res) => {
  const { alumno, titulo, autor, grupo } = req.body;
  db.run("UPDATE libros SET alumno = ?, titulo = ?, autor = ?, grupo = ? WHERE id = ?", 
    [alumno, titulo, autor, grupo, req.params.id], 
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Libro actualizado correctamente" });
    });
});

// Eliminar un libro
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM libros WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Libro eliminado correctamente" });
  });
});

module.exports = router;



//leer
router.get('/', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// Actualizar
// Endpoint para actualizar una clase
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { day, hour, subject, teacher, groupName } = req.body;

  const query = `
  UPDATE items
  SET day = ?, hour = ?, subject = ?, teacher = ?, groupName = ?
  WHERE id = ?
`;

  const params = [day, hour, subject, teacher, groupName, id];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, day, hour, subject, teacher, groupName });
  });
});
//eliminar
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM items WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes > 0 });
  });
});



 module.exports = router;

