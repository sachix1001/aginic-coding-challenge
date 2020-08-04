const express = require("express");
const path = require("path");
const db = require("./knex");
const bodyParser = require("body-parser");

const setupServer = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,DELETE,OPTIONS,PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, authorization"
    );
    next();
  });
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("/job/all", async (req, res) => {
    try {
      const job = await db.select().table("job");
      res.json(job);
    } catch (err) {
      console.error("Error loading locations!", err);
      res.sendStatus(500);
    }
  });

  app.get("/job/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const job = await db.where({ id }).table("job");
      if (job === null) {
        res.status(404).end();
      } else {
        res.json(job);
      }
    } catch (err) {
      console.error("Error loading locations!", err);
      res.sendStatus(500);
    }
  });

  app.post("/job", async (req, res) => {
    const URL = req.body;
    db("job")
      .insert(URL)
      .then((job) => {
        res.status(201).json(job);
      });
  });

  app.get("/error", async (req, res) => {
    res.sendStatus(404);
  });

  return app;
};

module.exports = { setupServer };
