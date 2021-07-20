import 'mocha';
import chaiHttp = require('chai-http');
import * as chai from 'chai';
import * as dotenv from 'dotenv';
dotenv.config();

import app from '../src/app';
import { findAndAssign } from '../src/cases/auto_assignment';
chai.use(chaiHttp);
const expect = chai.expect;
const globalAny: any = global;

describe('Testing API Request', () => {
  it('should get response from the endpoint', () => {
    return chai
      .request(app)
      .get('/')
      .then(res => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('reporting a case', () => {
    return chai
      .request(app)
      .post('/case/report')
      .set('Accept', 'application/json')
      .send({
        bikeOwnerName: 'TestOwnerName'
      })
      .then(res => {
        expect(res.body.success).to.equal(true);
        globalAny.caseId = res.body.result.caseId;
      });
  });

  it('find and assign officers to a case', async () => {
    let success = true;
    try {
      await findAndAssign();
    } catch {
      success = false;
    }
    return chai.assert.equal(success, true);
  });

  it('resolving the case', () => {
    return chai
      .request(app)
      .put(`/case/resolve/${globalAny.caseId}`)
      .then(res => {
        expect(res.body.success).to.equal(true);
      });
  });
});

//process.exit(0);
