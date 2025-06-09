const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const precios = {
    A: 300,
    B: 490,
    C: 670,
    D: 899
};

const calcularPrecio = (seccion, cantidad, dia) => {
    if (!precios[seccion] || cantidad <= 0 || !dia) {
        throw new Error('Sección inválida, cantidad no válida o día no especificado');
    }

    let precioBase = precios[seccion] * cantidad;

    const descuentos = {
        cantidad: cantidad > 1 ? 0.95 : 1, 
        dia: dia.toLowerCase() === 'domingo' ? 0.84 : 1 
    };

    precioBase *= descuentos.cantidad * descuentos.dia;

    return {
        seccion,
        cantidad,
        dia,
        precio_total: `$${precioBase.toFixed(2)}`
    };
};

app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});

//ruta
app.post('/precio', (req, res, next) => {
    try {
        const { seccion, cantidad, dia } = req.body;

        if (!seccion || !cantidad || !dia) {
            throw new Error('Faltan datos necesarios (sección, cantidad, día)');
        }

        const resultado = calcularPrecio(seccion, cantidad, dia);
        res.json(resultado);
    } catch (error) {
        next(error);
    }
});

// Iniciando el servidor
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
