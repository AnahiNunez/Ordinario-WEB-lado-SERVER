const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const librosRoutes = require('./routes/libros');

app.use(cors());
app.use(express.json());
app.use('/api/libros', librosRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
