'use strict';

const Helper = require('../../training_helper');
const TrainingHelper = require('../../training_helper');
var EventRotation = require('../../event_rotation')
const Schedule = require('../../schedule');
const CapacityCalculator = require('../../training_capacity_calculator');
const CTime = require('../../ctime');
const TrainingSpeed = require('../../training/speed')
const RotationBuilder = require('./rotation_builder')
const chai = require('chai');
const expect = chai.expect;

var SECONDS_IN_MINUTE = 60;

describe('Training Helper', function () {

  it('creates now hint', async () => {

    var miniEventRotation = new EventRotation(
      0,
      [
        { utc: 0, local: "5pm", name: "Monster Hunt", duration: 1 },
        { utc: 1, local: "6pm", name: "Monster Hunt", duration: 1 },
        { utc: 2, local: "7pm", name: "Monster Hunt", duration: 1 },
        { utc: 3, local: "8pm", name: "Monster Hunt", duration: 1 },
        { utc: 4, local: "9pm", name: "Monster Hunt", duration: 1 },
        { utc: 5, local: "10pm", name: "Monster Hunt", duration: 1 },
        { utc: 6, local: "11pm", name: "Training", duration: 1 },
      ].sort(function(x,y) { return x.utc - y.utc; })
    )

    var sch = new Schedule().fromHepoch(0).toHepoch(6);
    sch.addRotations([ miniEventRotation ])

    // make sure schedule is setup as expected
    expect(sch.eventsForHepoch(6)[0].name).to.equal("Training");

    var capacityCalculator = new CapacityCalculator();
    var powerPerSecond = { wmc: 5, s: 10 };

    var ctime = new CTime();
    ctime.setSepoch(30 * SECONDS_IN_MINUTE)


    var helper = new Helper(powerPerSecond);
    var hints = helper.createHints(ctime, sch);
    expect(hints.length).to.equal(1);
    expect(hints[0]).to.equal("in next 5 minutes: train 54150 to 62250")
    //9542-9601 T2 => Gold @ 05:00am")
  });
});



describe('Calculate Number of Seconds', function () {
  it('Calculate Seconds For Bronze / WMC', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(powerPerSecond);
    expect(helper.calculateSecondsFor("wmc", 5000)).to.equal(6651);
  });

  it('Calculate Seconds For Bronze / S', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(powerPerSecond);
    expect(helper.calculateSecondsFor("s", 5000)).to.equal(4434);
  });


  it('Calculate Seconds For Silver / WMC', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(powerPerSecond);
    expect(helper.calculateSecondsFor("wmc", 15000)).to.equal(19953);
  });

  it('Calculate Seconds For Silver / S', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(powerPerSecond);
    expect(helper.calculateSecondsFor("s", 15000)).to.equal(13302);
  });
});

function assertUnits(actual, expected) {
  expect(expected.t1).to.equal(actual.t1);
  expect(expected.t2).to.equal(actual.t2);
}


describe('Calculate Number of Units', function () {
  it('Calculates T1', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(powerPerSecond);
    assertUnits(helper.calculateUnitsFor(1000), { t1: 375, t2: 187 });
  });
});

describe('Calculate use cases', function () {
  it('Calculates Umpire t2 for Silver', async() => {
    var powerPerSecond = { wmc: 0.571985700357491, s: 0.857978550536237 };
    var helper = new Helper(powerPerSecond);

    var wmcSeconds = helper.calculateSecondsFor("wmc", 15000);
    var wmcUnits = helper.calculateUnitsFor(wmcSeconds);
    expect(wmcUnits.t1 * 2).to.equal(15000);
  });
});

// describe('Create hint', function () {
//   it('Create a hint for Umpire t2 for Silver', async() => {
//     var trainingParams = {
//       maxUnits: 4400, t1WarriorSeconds: 15385
//     };
//     var secondsUntilEventStart = 30 * SECONDS_IN_MINUTE;
//     var hint = new Helper().createHint().withOptions(trainingParams).eventStartsIn(secondsUntilEventStart).seconds();
//     expect(hint).is.not.null;
//     console.log(hint);
//   });
// });
//
//
//
// describe('Calculate hint', function () {
//   it('Calculates a hint for Umpire', async() => {
//     var trainingTimeSeconds = 10000;
//     var trainingSpeed = new TrainingSpeed().Create(4400, trainingTimeSeconds, trainingTimeSeconds, trainingTimeSeconds, trainingTimeSeconds);
//     var secondsUntilEventStart = 30 * SECONDS_IN_MINUTE;
//     var hint = new Helper().createHint().withOptions(trainingSpeed).eventStartsIn(secondsUntilEventStart).seconds();
//     expect(hint).is.not.null;
//     console.log(hint);
//   });
// });
