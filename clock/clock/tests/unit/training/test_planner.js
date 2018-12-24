'use strict';

const EventRotation = require('../../../event_rotation');
const TrainingPlanner = require('../../../training/planner');
const Schedule = require('../../../schedule');

const RotationBuilder = require('../rotation_builder')

const chai = require('chai');
const expect = chai.expect;
var chaiDeepMatch = require('chai-deep-match');
chai.use( chaiDeepMatch );

describe('Test Training Planner', function () {

  it('finds next training event', async () => {
    var miniEventRotation = new EventRotation(
      0,
      [
        { utc: 0, local: "5pm", name: "Monster Hunt", duration: 1 },
        { utc: 1, local: "6pm", name: "Monster Hunt", duration: 1 },
        { utc: 2, local: "7pm", name: "Training", duration: 1 },
        { utc: 3, local: "8pm", name: "Monster Hunt", duration: 1 },
        { utc: 4, local: "9pm", name: "Monster Hunt", duration: 1 },
        { utc: 5, local: "10pm", name: "Monster Hunt", duration: 1 },
        { utc: 6, local: "11pm", name: "Training", duration: 1 },
      ].sort(function(x,y) { return x.utc - y.utc; })
    )

    var sch = new Schedule().fromHepoch(0).toHepoch(6);
    sch.addRotations([ miniEventRotation ])

    var nextTraining = new TrainingPlanner().findNextEvent().in(sch);
    expect(nextTraining).to.not.be.null;
    expect(nextTraining.startHepoch).to.equal(2);
  });

});
