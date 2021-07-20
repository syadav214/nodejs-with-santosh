var except = require("chai").expect;

describe('skGetSubscription - Unit Tests', function() {

    it('Does file exists or not?', function(done) {
        let fs = require('fs'),
            fileExists = false;
        if (fs.existsSync('../output/result.json')) {
            fileExists = true;
        }
        except(fileExists).to.equal(true);
        done();
    });

    let result,
        expected_output = require('../test/fixture/expected_output');

    try {
        result = require('../output/result');
    } catch (err) {
        //intentionally kept catch block empty to check file exists or not 
    }

    it('Does result file has all account as in expected_output file?', function(done) {
        let allAccountPresent = true;
        if (typeof result != 'undefined' && typeof expected_output != 'undefined') {
            for (let acc in expected_output.subscriptions) {
                if ((acc in result.subscriptions) == false) {
                    allAccountPresent = false;
                    break;
                }
            }
        }
        except(allAccountPresent).to.equal(true);
        done();
    });

    it('Does number of accounts match between result file and expected_output file?', function(done) {
        let resultCount = 0;
        if (typeof result != 'undefined') {
            resultCount = Object.keys(result.subscriptions).length;
        }
        except(resultCount).to.equal(Object.keys(expected_output.subscriptions).length);
        done();
    });

    it('Does number of subscriptions days match between result file and expected_output file?', function(done) {
        let resultCount = 0,
            matchedCount = 0,
            unMatchedCount = 0;

        if (typeof result != 'undefined') {
            for (let acc in expected_output.subscriptions) {
                for (let partners in expected_output.subscriptions[acc]) {
                    if (result.subscriptions[acc][partners] == expected_output.subscriptions[acc][partners]) {
                        matchedCount++;
                    } else {
                        unMatchedCount++;
                    }
                }
            }
        }

        except(unMatchedCount == matchedCount).to.equal(true);
        done();
        console.log('Matched Count:', matchedCount);
        console.log('Unmatched Count:', unMatchedCount);
    });

});