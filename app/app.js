const express = require("express");
const multer = require("multer");
const fs = require("fs");
const libre = require("libreoffice-convert");

const app = express();
const port = process.env.PORT || 3000;

// Configuración de multer para manejar archivos subidos
const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = file.path;
  const outputPath = `${filePath}.pdf`;

  const fileBuffer = fs.readFileSync(filePath);

  libre.convert(fileBuffer, ".pdf", undefined, (err, done) => {
    

    if (err) {
      console.error(`Error to converting the file: ${err}`);
      return res.status(500).send("Error to converting the file");
    }

    fs.writeFileSync(outputPath, done);

    const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

    res.download(outputPath, `${fileNameWithoutExt}-converted.pdf`, (err) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
      if (err) {
        console.error(`Error to send the file: ${err}`);
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
