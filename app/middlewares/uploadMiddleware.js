const multer = require("multer");
const path = require("path");

const uploadDir = "uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".docx" && ext !== ".doc") {
      return cb(new Error("Only Word documents are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
