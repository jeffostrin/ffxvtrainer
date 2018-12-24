'use strict';

const TimeConstants = require('../../../time_constants')
const TrainingSpeed = require('../../../training/speed');

const chai = require('chai');
const expect = chai.expect;
var chaiDeepMatch = require('chai-deep-match');
chai.use( chaiDeepMatch );

var tc = new TimeConstants();

describe('Test Training Speed', function () {

  it('Parses Text', async () => {
    var trainingSpeed = new TrainingSpeed().Parse("20590", "1d 04:35:50", "3d 08:04:20", "11:26:20", "4d 09:28:54")
    var expected = {
      queueSize: 20590,
      t1: {
        warrior: (1 * tc.SECONDS_IN_DAY) + (4 * tc.SECONDS_IN_HOUR) + (35 * tc.SECONDS_IN_MINUTE) + 50,
        mage:    (3 * tc.SECONDS_IN_DAY) + (8 * tc.SECONDS_IN_HOUR) + (4 * tc.SECONDS_IN_MINUTE) + 20,
        calvary: (0 * tc.SECONDS_IN_DAY) + (11 * tc.SECONDS_IN_HOUR) + (26 * tc.SECONDS_IN_MINUTE) + 20,
        seige:   (4 * tc.SECONDS_IN_DAY) + (9 * tc.SECONDS_IN_HOUR) + (28 * tc.SECONDS_IN_MINUTE) + 54,
      }
    };
    expect(trainingSpeed).to.deep.match(expected);
  });

});
