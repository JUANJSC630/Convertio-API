const multer = require("multer");
const path = require("path");

const uploadDir = "uploads";
const allowedFormats = [
  ".docx",
  ".doc",
  ".xlsx",
  ".xls",
  ".pptx",
  ".ppt",
  ".odt",
  ".txt",
  ".jpg",
  ".png",
  ".jpeg",
];

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
    if (!allowedFormats.includes(ext)) {
      return cb(
        new Error(
          `Unsupported format: ${ext}. Allowed formats are: ${allowedFormats.join(
            ", "
          )}`
        )
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
