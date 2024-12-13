const express = require("express");
const { formatToPdf } = require("../controllers/formatToPdfController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("file"), formatToPdf);

module.exports = router;
