// routes/index.js
const express = require("express");

const formatToPdf = require("./format-to-pdf");
const pdfToFormat = require("./pdf-to-format");

const router = express.Router();

router.use("/format-to-pdf", formatToPdf);
router.use("/pdf-to-format", pdfToFormat);

module.exports = router;
