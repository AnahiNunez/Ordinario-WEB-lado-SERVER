const { DataTypes } = require('sequelize');
const sequelize = require('../basedatos');

const Articulo = sequelize.define('Articulo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Articulo;