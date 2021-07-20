const chai = require('chai'),
  supertest = require('supertest'),
  dotenv = require('dotenv'),
  api = supertest(require('../src/app'));

global.chai = chai;
global.supertest = supertest;
global.api = api;

dotenv.config();

describe('ApiRunning Tests', () => {
  it('should get response as success = false from the endpoint without x-api-key', done => {
    api
      .get('/')
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(false);
        done();
      });
  });

  it('should get response from the endpoint', done => {
    api
      .get('/')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });
});
