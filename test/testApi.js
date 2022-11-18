let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../server");


describe("Test submit request", () => {
    it("Validate the Submit the request", (done) => {
        var number = 20;
        chai.request(server)
            .post("/submit")
            .send({ number })
            .end((err, res) => {
                if (err) return done(err);
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                done();
            });
    });
});
