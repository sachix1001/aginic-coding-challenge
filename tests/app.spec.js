const chai = require("chai");
const { assert } = require("chai");
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
  
  describe("POST /job", () => {
    afterEach(() => knex("job").del());
    it("should return status code 201", async () => {
      const res = await request.post("/job").send({ URL: "www.google.com" });
      res.status.should.equal(201);
    });
    it("should store a job in database", async () => {
      await request.post("/job").send({ URL: "www.google.com" });
      const jobs = await knex.select().table("job");
      jobs.length.should.equal(1);
    });
  });

  describe("GET /clear", () => {
    it("should delete all data in database", async () => {
      await knex("job").insert({ URL: "www.google.com" });
      await request.get("/clear");
      const data = await knex('job').select()
      data.length.should.equal(0);
    });
  });

  describe("GET /job/all", () => {
    afterEach(() => knex("job").del());
    it("should return status code 200", async () => {
      const res = await request.get("/job/all");
      res.status.should.equal(200);
    });
    it("should return an array of all jobs", async () => {
      await knex("job").insert({ URL: "www.google.com" });
      await knex("job").insert({ URL: "https://www.linkedin.com" });

      const res = await request.get("/job/all");
      JSON.parse(res.text).length.should.equal(2);
    });
  });
  // describe("GET /job/:id", () => {
  //   beforeEach(() => knex("job").insert({ URL: "www.google.com" }));
  //   afterEach(() => knex("job").del());
  //   it("should return status code 200", async () => {
  //     const res = await request.get("/job/1");
  //     res.status.should.equal(200);
  //   });
  // });
});
