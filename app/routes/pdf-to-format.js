const express = require("express");
const { pdfToFormat } = require("../controllers/pdfToFormatController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("file"), pdfToFormat);

module.exports = router;
