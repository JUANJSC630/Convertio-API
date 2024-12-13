const fs = require("fs");
const libre = require("libreoffice-convert");

const formatToPdf = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = file.path;
  const outputPath = `${filePath}.pdf`;

  const fileBuffer = fs.readFileSync(filePath);

  libre.convert(fileBuffer, ".pdf", undefined, (err, done) => {
    if (err) {
      console.error(`Error converting to PDF: ${err}`);
      return res.status(500).send("Error converting to PDF");
    }

    fs.writeFileSync(outputPath, done);

    const fileNameWithoutExt = file.originalname.replace(/\.[^/.]+$/, "");

    res.download(outputPath, `${fileNameWithoutExt}-converted.pdf`, (err) => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
      if (err) {
        console.error(`Error sending the file: ${err}`);
      }
    });
  });
};

module.exports = { formatToPdf };
