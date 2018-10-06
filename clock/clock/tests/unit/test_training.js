
'use strict';

const RateCalculator = require('../../training_capacity_calculator');
const TroopCalculator = require('../../training_helper');

const chai = require('chai');
const expect = chai.expect;
var chaiDeepMatch = require('chai-deep-match');
chai.use( chaiDeepMatch );

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


  it('Calculates Options for a timeframe', async () => {

    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(12000).trainingTime(12, 0, 0).powerPerSecond();
    var troopCalculator = new TroopCalculator(trainingRate);

    var nineAndHalfHoursInSeconds = (60 * 60 * 9) + (60 * 30);
    var options = troopCalculator.calculateOptionsForTimeframe(nineAndHalfHoursInSeconds, nineAndHalfHoursInSeconds + (60*60));
    var expected = {
      t1: {
        min: { count: 9500, warrior: "silver", seige: "silver" },
        max: { count: 10500, warrior: "silver", seige: "gold" },
      },
      t2: {
        min: { count: 4750, warrior: "silver", seige: "silver" },
        max: { count: 5250, warrior: "silver", seige: "gold" },
      },
      t3: {
        min: { count: 3166, warrior: "silver", seige: "silver" },
        max: { count: 3500, warrior: "silver", seige: "gold" },
      },
    };
    expect(options).to.deep.match(expected);
    expect(expected).to.deep.match(options);
  });

  it('Calculates Options', async () => {

    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(12000).trainingTime(12, 0, 0).powerPerSecond();
    var troopCalculator = new TroopCalculator(trainingRate);

    var nineAndHalfHoursInSeconds = (60 * 60 * 9) + (60 * 30);
    var options = troopCalculator.calculateOptionsFor(nineAndHalfHoursInSeconds);
    var expected = {
      t1: {
        min: { count: 9500, warrior: "silver", seige: "silver" },
        max: { count: 10416, warrior: "silver", seige: "gold" },
      },
      t2: {
        min: { count: 4750, warrior: "silver", seige: "silver" },
        max: { count: 5208, warrior: "silver", seige: "gold" },
      },
      t3: {
        min: { count: 3166, warrior: "silver", seige: "silver" },
        max: { count: 3472, warrior: "silver", seige: "gold" },
      },
    };
    expect(options).to.deep.match(expected);
    expect(expected).to.deep.match(options);
  });

  it ('Calculate "no option" when there is too much time', async () => {
    var rateCalculator = new RateCalculator();
    var trainingRate = rateCalculator.troopCapacity(1000).trainingTime(2, 0, 0).powerPerSecond();
    // console.log(trainingRate);
    var troopCalculator = new TroopCalculator(trainingRate);

    var fourHoursInSeconds = (4 * 60 * 60);
    var options = troopCalculator.calculateOptionsFor(fourHoursInSeconds);
    expect(options).to.be.null;
  });
});
