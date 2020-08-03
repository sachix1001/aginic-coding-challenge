const chai = require("chai");
const chaiHttp = require("chai-http");
const { setupServer } = require("../server/app.js");

chai.use(chaiHttp);
chai.should();

const server = setupServer();

describe("API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/", () => {
    it("should return status code 200", async () => {
      const res = await request.get("/api");
      res.status.should.equal(200);
    });
  });
});
