const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Usuario de prueba (puedes conectar con tu base de datos real)
const usuarioEjemplo = {
  correo: 'admin@ejemplo.com',
  password: '1234'
};

router.post('/login', (req, res) => {
  const { correo, password } = req.body;

  if (correo === usuarioEjemplo.correo && password === usuarioEjemplo.password) {
    const token = jwt.sign({ correo }, 'secreto_jwt', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

module.exports = router;
