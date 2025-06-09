const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

//post
app.post('/alumno', (req, res) => {
    const { cuenta, nombre, promedio, grado, grupo } = req.body;

    if (!cuenta || !nombre || !promedio || !grado || !grupo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const alumno = { cuenta, nombre, promedio, grado, grupo };

    //json
    fs.writeFile('alumno.json', JSON.stringify(alumno, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            return res.status(500).json({ error: 'No se pudo guardar la información' });
        }
        res.status(200).json({ message: 'Información guardada correctamente', alumno });
    });
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
