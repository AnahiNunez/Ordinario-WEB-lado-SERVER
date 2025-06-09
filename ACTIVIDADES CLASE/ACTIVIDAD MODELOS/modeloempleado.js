const { DataTypes } = require('sequelize');
const sequelize = require('../basedatos');

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
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
  },
  sueldo: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

module.exports = Empleado;