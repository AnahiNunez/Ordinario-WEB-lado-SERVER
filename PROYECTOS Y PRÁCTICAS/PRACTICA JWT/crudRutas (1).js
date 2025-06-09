const express = require('express');
const router = express.Router();
const verificarToken = require('./middlewareJWT');

// Modelos
const Cliente = require('./mCliente');

// Función CRUD protegida
const crearCRUD = (modelo, nombre) => {
  router.get(`/${nombre}`, verificarToken, async (req, res) => {
    const datos = await modelo.findAll();
    res.json(datos);
  });

  router.get(`/${nombre}/:id`, verificarToken, async (req, res) => {
    const dato = await modelo.findByPk(req.params.id);
    if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });
    res.json(dato);
  });

  router.post(`/${nombre}`, verificarToken, async (req, res) => {
    const nuevo = await modelo.create(req.body);
    res.status(201).json(nuevo);
  });

  router.put(`/${nombre}/:id`, verificarToken, async (req, res) => {
    const dato = await modelo.findByPk(req.params.id);
    if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });
    await dato.update(req.body);
    res.json(dato);
  });

  router.delete(`/${nombre}/:id`, verificarToken, async (req, res) => {
    const dato = await modelo.findByPk(req.params.id);
    if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });
    await dato.destroy();
    res.status(204).send();
  });
};

crearCRUD(Cliente, 'clientes');

module.exports = router;
