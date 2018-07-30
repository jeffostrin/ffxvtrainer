'use strict';

const Helper = require('../../training_helper');
var EventRotation = require('../../event_rotation')
const Schedule = require('../../schedule');
const CapacityCalculator = require('../../training_capacity_calculator');
const chai = require('chai');
const expect = chai.expect;

describe('Training Helper', function () {
  it('Does its thing', async () => {

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

    var helper = new Helper(3000, powerPerSecond);
    var hints = helper.createHints(sch);
  });
});



describe('Calculate Number of Seconds', function () {
  it('Calculate Seconds For Bronze / WMC', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(8205, powerPerSecond);
    expect(helper.calculateSecondsFor({ type: "wmc", power: 5000 })).to.equal(6651);
  });

  it('Calculate Seconds For Bronze / S', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(8205, powerPerSecond);
    expect(helper.calculateSecondsFor({ type: "s", power: 5000 })).to.equal(4434);
  });


  it('Calculate Seconds For Silver / WMC', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(8205, powerPerSecond);
    expect(helper.calculateSecondsFor({ type: "wmc", power: 15000 })).to.equal(19953);
  });

  it('Calculate Seconds For Silver / S', async() => {
    var powerPerSecond = { wmc: 0.751786695986806, s: 1.12768004398021 };
    var helper = new Helper(8205, powerPerSecond);
    expect(helper.calculateSecondsFor({ type: "s", power: 15000 })).to.equal(13302);
  });
});
