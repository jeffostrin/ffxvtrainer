
'use strict';

const RateCalculator = require('../../training_capacity_calculator');
const TroopCalculator = require('../../training_helper');

const chai = require('chai');
const expect = chai.expect;

function assertCapacity(actual, expected) {
  expect(expected.wmc).to.equal(actual.wmc);
  expect(expected.s).to.equal(actual.s);
}

describe('Test Calculator', function () {
  it('Calculates Umpires Numbers', async () => {

    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(11530).trainingTime(11, 7, 15).powerPerSecond();
    console.log(trainingRate);
    var troopCalculator = new TroopCalculator(11530, trainingRate);

    expect(troopCalculator.calculateSecondsFor("wmc", 5000)).to.equal(8681);
    expect(troopCalculator.calculateSecondsFor("s", 5000)).to.equal(5788);
    expect(troopCalculator.calculateSecondsFor("wmc", 15000)).to.equal(26042);
    expect(troopCalculator.calculateSecondsFor("s", 15000)).to.equal(17362);
  });

});
