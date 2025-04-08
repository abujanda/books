import chai from "chai"
import chaiHttp from "chai-http";
import api from "../src/api.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("POST /api/auth/login", () => {
  it("should return 200 and a token for valid credentials", (done) => {
    chai
      .request(api)
      .post("/api/auth/login")
      .send({ email: "john.doe@testing.com", password: "Pa$$w0rd" })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.have.status(200);
        expect(res.body).to.have.property({
          token: expect.any(String),
        });
        done();
      });
  });

  it("should return 401 for invalid credentials", (done) => {
    chai
      .request(api)
      .post("/api/auth/login")
      .send({ email: "john.doe@testing.com", password: "wrongpassword" })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.have.status(401);
        expect(res.body).to.have.property(
          "message",
          "Invalid email or password"
        );
        done();
      });
  });
});
