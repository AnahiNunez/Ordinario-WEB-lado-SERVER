// Asegúrate de que la ruta a tu archivo database.js sea correctaconst { DataTypes } = require('sequelize');
const sequelize = require('../basedatos');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.STRING,
  },
});

module.exports = Cliente;