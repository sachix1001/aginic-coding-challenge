const express = require("express");
const path = require("path");
const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api", (req, res) => res.statusMessage(200).send("Hello World!"));
const server = app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = server