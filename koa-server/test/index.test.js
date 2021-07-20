'use strict';

const app = require('../src'),
    chai = require('chai'),
    request = require('request'),
    except = chai.expect,
    baseurl = app.context.config.domain;

    console.log(baseurl)

    describe('API Integration Tests', function() {
        describe('#GET /', function() { 
          it('should get default partner', function(done) { 
            request.get({ url: baseurl +"/" },
                function(err, res, body) {
                    except(res.statusCode).to.equal(200);
                    done();
                });
          });
        });
      });