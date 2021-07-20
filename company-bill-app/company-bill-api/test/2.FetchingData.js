const { chai, supertest, api } = global;

describe('Company Tests', () => {
  it('should get response from the /company route', done => {
    api
      .get('/company')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('should get response from the /bills route', done => {
    api
      .get('/bills/0/0/1')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        const { body } = res.body;
        if (body.length > 0) {
          global.billID = body[0].id; // to be used in FetchBill.js
        }
        done();
      });
  });

  it('should get response from the /bill route', done => {
    api
      .get(`/bill/${global.billID}`)
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('should get response from the /year route', done => {
    api
      .get('/year')
      .set('x-api-key', process.env.APIKEY)
      .end((err, res) => {
        chai.expect(res.body).to.have.property('success');
        chai.expect(res.body.success).to.equal(true);
        done();
      });
  });
});
