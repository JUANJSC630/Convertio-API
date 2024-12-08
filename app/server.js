const express = require("express");
const cors = require("cors");
const fs = require("fs");
const wordToPdf = require("./routes/word-to-pdf");

const app = express();
const port = process.env.PORT || 3000;

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Directory ${uploadDir} created`);
}

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));

// Use routes
app.use("/api/word-to-pdf", wordToPdf);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
