const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const libre = require("libreoffice-convert");

const app = express();
const port = 3000;

// Configuración de multer para subir archivos
const upload = multer({ dest: "uploads/" });

// Ruta para convertir archivo Word a PDF
app.post("/convert", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No se subió ningún archivo");
  }

  const filePath = file.path;
  const outputPath = `${filePath}.pdf`;

  // Leer el archivo subido
  const fileBuffer = fs.readFileSync(filePath);

  // Convertir a PDF
  libre.convert(fileBuffer, ".pdf", undefined, (err, done) => {
    if (err) {
      console.error(`Error al convertir el archivo: ${err}`);
      return res.status(500).send("Error al convertir el archivo");
    }

    // Guardar el archivo convertido
    fs.writeFileSync(outputPath, done);

    // Enviar el archivo convertido como respuesta
    res.download(outputPath, "converted.pdf", (err) => {
      // Limpiar archivos temporales
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
      if (err) {
        console.error(`Error al enviar el archivo: ${err}`);
      }
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
