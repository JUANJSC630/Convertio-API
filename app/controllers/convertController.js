const fs = require("fs");
const libre = require("libreoffice-convert");

const convertFile = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = file.path;
  const outputPath = `${filePath}.pdf`;

  const fileBuffer = fs.readFileSync(filePath);

  libre.convert(fileBuffer, ".pdf", undefined, (err, done) => {
    if (err) {
      console.error(`Error converting the file: ${err}`);
      return res.status(500).send("Error converting the file");
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

module.exports = { convertFile };
