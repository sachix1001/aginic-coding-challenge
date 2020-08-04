const chai = require("chai");
const { expect, assert } = require("chai");
const chaiHttp = require("chai-http");
const { setupServer } = require("../server/app.js");
const knex = require("../server/knex");

chai.use(chaiHttp);
chai.should();

const server = setupServer();

describe("Database", () => {
  it("able to connect to database", () =>
    knex
      .raw("select 1+1 as result")
      .catch(() => assert.fail("unable to connect to db")));

  it("has run the initial migrations", () =>
    knex("job")
      .select()
      .catch(() => assert.fail("job table is not found")));
});

describe("API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /", () => {
    it("should return status code 200", async () => {
      const res = await request.get("/");
      res.status.should.equal(200);
    });
  });
  describe("GET /job/all", () => {
    it("should return status code 200", async () => {
      const res = await request.get("/job/all");
      res.status.should.equal(200);
    });
  });
  describe("GET /job/:id", () => {
    it("should return status code 200", async () => {
      const res = await request.get("/job/1");
      res.status.should.equal(200);
    });
  });
  describe("POST /job", () => {
    it("should return status code 201", async () => {
      const res = await request.post("/job").send({ URL: "www.google.com" });
      res.status.should.equal(201);
    });
  });
});
