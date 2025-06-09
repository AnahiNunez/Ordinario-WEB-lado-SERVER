const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./baseDatos');

const Proveedor = sequelize.define('Proveedor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'proveedores',
  timestamps: false,
});

module.exports = Proveedor;
