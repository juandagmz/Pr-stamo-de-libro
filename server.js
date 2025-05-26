const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/enviar', (req, res) => {
    const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

    if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
        return res.sendFile(path.join(__dirname, 'public', 'error.html'));
    }

    const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;
    const nombreArchivo = `id_${id}.txt`;
    const rutaArchivo = path.join(__dirname, 'data', nombreArchivo);

    fs.writeFile(rutaArchivo, contenido, (err) => {
        if (err) return res.status(500).send('Error al guardar archivo.');
        res.download(rutaArchivo);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
