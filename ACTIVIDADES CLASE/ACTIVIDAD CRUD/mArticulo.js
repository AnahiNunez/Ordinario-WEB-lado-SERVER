const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./baseDatos');

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
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  existencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'articulos',
  timestamps: false,
});

module.exports = Articulo;
