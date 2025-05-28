const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // carpeta donde está form.html y error.html

app.post('/enviar', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    // redirigir al archivo error.html
    return res.sendFile(path.join(__dirname, 'public', 'error.html'));
  }

  // si todo está bien, crear archivo .txt
  const contenido = `ID: ${id}\nNombre: ${nombre} ${apellido}\nTítulo: ${titulo}\nAutor: ${autor}\nEditorial: ${editorial}\nAño: ${año}`;
  const nombreArchivo = `libro_${id}.txt`;
  const rutaArchivo = path.join(__dirname, 'data', nombreArchivo);

  fs.writeFile(nombreArchivo, contenido, (err) => {
    if (err) {
      return res.status(500).send('Error al guardar el archivo');
    }
    res.download(nombreArchivo);
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
