const chai = require("chai");
const { assert } = require("chai");
const { updateDb, sendHttpCall, wrapper } = require("../worker");
const knex = require("../server/knex");
const sinon = require("sinon");

var expect = chai.expect;

describe("sendHttpCall", () => {
  it("should return three digit integer of status code", async () => {
    const status = await sendHttpCall({ URL: "https://www.google.com/" });
    expect(status).to.be.a("number");
    expect(status.toString().length).to.equal(3);
  });

  it("should return 500 if input is invalid", async () => {
    const status = await sendHttpCall("google");
    expect(status).to.be.a("number");
    expect(status).to.within(400, 599);
  });

  it("should return 5xx or 4xx when http request to given job is failed", async () => {
    const status = await sendHttpCall({ URL: "google" });
    expect(status).to.be.a("number");
    expect(status).to.within(400, 599);
  });

  it("should return 2xx when http request to given job is successful", async () => {
    const status = await sendHttpCall({ URL: "https://www.google.com/" });
    expect(status).to.be.a("number");
    expect(status).to.within(200, 299);
  });
});

describe("function updateDB", () => {
  describe("handle input", () => {
    it("should return -1 if input is empty", async () => {
      const output = await updateDb();
      expect(output).to.equal(-1);
    });

    it("should return -1 if job is not a right object", async () => {
      const job = "job";
      const output = await updateDb(job, 200);
      expect(output).to.equal(-1);
    });

    it("should return -1 if status is not a number", async () => {
      const job = "job";
      const output = await updateDb(job, "200");
      expect(output).to.equal(-1);
    });

    it("should return -1 if status is not a number", async () => {
      const job = "job";
      const output = await updateDb(job, "200");
      expect(output).to.equal(-1);
    });
  });

  describe("function update database", () => {
    afterEach(() => knex("job").del());
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("should update property state and completed when success status is passed", async () => {
      const job = {
        URL: "https://www.google.com/",
        attempt: 0,
        completed: false,
      };
      const id = await knex.insert(job).returning("id").into("job");
      job.id = id[0];

      await updateDb(job, 200);
      const updatedJob = await knex("job").where({ id: id[0] });

      expect(updatedJob[0].state).to.equal(200);
      expect(updatedJob[0].completed).to.equal(true);
    });

    it("should increment 'attempt' by one when given state is 4xx or 5xx", async () => {
      const job = {
        URL: "https://www.google.com/",
        attempt: 0,
        completed: false,
      };
      const id = await knex.insert(job).returning("id").into("job");
      job.id = id[0];

      await updateDb(job, 404);
      const updatedJob = await knex("job").where({ id: id[0] });

      expect(updatedJob[0].attempt).to.equal(1);
    });

    it("should set 'state' with given state if three attempt failed", async () => {
      const job = {
        URL: "https://www.google.com/",
        attempt: 2,
        completed: false,
      };
      const id = await knex.insert(job).returning("id").into("job");
      job.id = id[0];

      await updateDb(job, 404);
      const updatedJob = await knex("job").where({ id: id[0] });

      expect(updatedJob[0].attempt).to.equal(3);
      expect(updatedJob[0].completed).to.equal(true);
    });
  });
});

describe("function start()", () => {
  const spy = sinon.spy(wrapper, "start");
  afterEach(async () => {
    await knex("job").del();
    spy.restore();
  });
  it("should return start() after a job is don", async () => {
    await knex("job").insert({ URL: "https://www.google.com/" });
    spy();
    expect(spy.callCount).to.equal(1);
  });

  it("should return 'no job' when there is no job to be done", async () => {
    await knex("job").del();
    const output = await wrapper.start();
    expect(output).to.equal("no job");
  });
});
