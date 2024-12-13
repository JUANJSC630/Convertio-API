const fs = require("fs");
const libre = require("libreoffice-convert");

const pdfToFormat = (req, res, format) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = file.path;
  const outputPath = `${filePath}.${format}`;

  const fileBuffer = fs.readFileSync(filePath);

  libre.convert(fileBuffer, `.${format}`, undefined, (err, done) => {
    if (err) {
      console.error(`Error converting PDF to ${format}: ${err}`);
      return res.status(500).send(`Error converting PDF to ${format}`);
    }

    fs.writeFileSync(outputPath, done);

    const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

    res.download(outputPath, `${fileNameWithoutExt}-converted.${format}`, (err) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
      if (err) {
        console.error(`Error sending the file: ${err}`);
      }
    });
  });
};

module.exports = { pdfToFormat };
