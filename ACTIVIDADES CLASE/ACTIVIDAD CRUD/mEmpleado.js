const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./baseDatos');

const Empleado = sequelize.define('Empleado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sueldo: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'empleados',
  timestamps: false,
});

module.exports = Empleado;
