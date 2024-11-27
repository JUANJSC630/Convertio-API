const express = require("express");
const multer = require("multer");
const fs = require("fs");
const libre = require("libreoffice-convert");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Directorio '${uploadDir}' creado.`);
}

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
