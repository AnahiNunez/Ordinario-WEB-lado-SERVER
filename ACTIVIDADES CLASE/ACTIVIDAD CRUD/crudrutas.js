const express = require('express');
const router = express.Router();

// Modelos
const Cliente = require('../modelos/Cliente');
const Proveedor = require('../modelos/Proveedor');
const Articulo = require('../modelos/Articulo');
const Empleado = require('../modelos/Empleado');

// Función para generar CRUD dinámico
const crearCRUD = (modelo, nombre) => {
  router.get(`/${nombre}`, async (req, res) => {
    try {
      const datos = await modelo.findAll();
      res.json(datos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get(`/${nombre}/:id`, async (req, res) => {
    try {
      const dato = await modelo.findByPk(req.params.id);
      if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });
      res.json(dato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post(`/${nombre}`, async (req, res) => {
    try {
      const nuevoDato = await modelo.create(req.body);
      res.status(201).json(nuevoDato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put(`/${nombre}/:id`, async (req, res) => {
    try {
      const dato = await modelo.findByPk(req.params.id);
      if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });

      await dato.update(req.body);
      res.json(dato);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete(`/${nombre}/:id`, async (req, res) => {
    try {
      const dato = await modelo.findByPk(req.params.id);
      if (!dato) return res.status(404).json({ error: `${nombre} no encontrado` });

      await dato.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Generar CRUD para cada modelo
crearCRUD(Cliente, 'clientes');
crearCRUD(Proveedor, 'proveedores');
crearCRUD(Articulo, 'articulos');
crearCRUD(Empleado, 'empleados');

module.exports = router;
