
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
    //console.log(trainingRate);
    var troopCalculator = new TroopCalculator(trainingRate);

    expect(troopCalculator.calculateSecondsFor("wmc", 5000)).to.equal(8681);
    expect(troopCalculator.calculateSecondsFor("s", 5000)).to.equal(5788);
    expect(troopCalculator.calculateSecondsFor("wmc", 15000)).to.equal(26042);
    expect(troopCalculator.calculateSecondsFor("s", 15000)).to.equal(17362);
  });

  it('Calculates Umpires Numbers - Sept 21 18', async () => {

    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(12100).trainingTime(11, 21, 19).powerPerSecond();
    //console.log(trainingRate);
    var troopCalculator = new TroopCalculator(trainingRate);

    expect(troopCalculator.calculateSecondsFor("wmc", 5000)).to.equal(8447);
    expect(troopCalculator.calculateSecondsFor("s", 5000)).to.equal(5631);
    expect(troopCalculator.calculateSecondsFor("wmc", 15000)).to.equal(25339);
    expect(troopCalculator.calculateSecondsFor("s", 15000)).to.equal(16893);
  });


  it('Calculates Umpires Numbers - Sept 25 18', async () => {

    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(12100).trainingTime(11, 16, 45).powerPerSecond();
    //console.log(trainingRate);
    var troopCalculator = new TroopCalculator(trainingRate);

    expect(troopCalculator.calculateSecondsFor("wmc", 5000)).to.equal(8390);
    expect(troopCalculator.calculateSecondsFor("s", 5000)).to.equal(5593);
    expect(troopCalculator.calculateSecondsFor("wmc", 15000)).to.equal(25169);
    expect(troopCalculator.calculateSecondsFor("s", 15000)).to.equal(16779);
  });

});