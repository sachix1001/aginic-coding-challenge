const express = require("express");
const path = require("path");
const db = require("./knex");
const bodyParser = require('body-parser')

const setupServer = () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("/api", (req, res) => res.status(200).send("Hello World!"));
  app.post("/api", (req, res) => res.status(200).send(req.body));
  

  return app;
};


module.exports = { setupServer };
