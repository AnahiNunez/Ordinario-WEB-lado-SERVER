const express = require('express')
const bodyParser = require('body-parser')
const monedas = require('./monedas') // Importar el modelo de la bd
const app = express()
const puerto = 3000

app.use(bodyParser.json())

app.listen(puerto, () => {
    console.log('servicio iniciado')
})

// Convertir moneda
app.post('/convertir', async (req, res) => {
    const { origen, destino, cantidad } = req.body;

    const data = await monedas.findOne({
        where: { origen, destino }
    });

    if (!data) {
        return res.sendStatus(404);
    }

    const { valor } = data;
    const resultado = cantidad * valor;

    res.send({ origen, destino, cantidad, resultado });
});

// Obtener todas las monedas
app.get('/monedas', async (req, res) => {
    const data = await monedas.findAll();
    res.send(data);
});

// Agregar una nueva moneda
app.post('/monedas', async (req, res) => {
    const { origen, destino, valor } = req.body;

    try {
        const nueva = await monedas.create({ origen, destino, valor });
        res.status(201).send(nueva);
    } catch (error) {
        res.status(400).send({ error: 'No se pudo agregar la moneda.' });
    }
});

// Editar una moneda existente
app.put('/monedas/:id', async (req, res) => {
    const { id } = req.params;
    const { origen, destino, valor } = req.body;

    const moneda = await monedas.findByPk(id);

    if (!moneda) {
        return res.status(404).send({ error: 'Moneda no encontrada.' });
    }

    moneda.origen = origen;
    moneda.destino = destino;
    moneda.valor = valor;

    await moneda.save();
    res.send(moneda);
});

