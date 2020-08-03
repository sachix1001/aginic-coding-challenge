const express = require("express");
const path = require("path");
const port = 3000;

const setupServer = () => {
  const app = express();

  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("/api", (req, res) => res.status(200).send("Hello World!"));
  const server = app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );

  return app;
};

const server = setupServer();
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});

module.exports = { setupServer };
