const express = require('express');
const sequelize = require('./baseDatos');
const rutas = require('./rutas/crudRoutes');

const app = express();
app.use(express.json());

app.use('/api', rutas);

const PORT = 3000;

sequelize.sync() // Sincroniza la base de datos
  .then(() => {
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(error => console.log('Error al conectar la base de datos:', error));
