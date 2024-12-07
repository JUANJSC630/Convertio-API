const express = require("express");
const { convertFile } = require("../controllers/convertController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("file"), convertFile);

module.exports = router;
