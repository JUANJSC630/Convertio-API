const express = require("express");
const { wordToPdfFile } = require("../controllers/wordToPdfController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("file"), wordToPdfFile);

module.exports = router;
