'use strict';

const GatherHelper = require('../../gather_helper');
var EventRotation = require('../../event_rotation')
const Schedule = require('../../schedule');
const chai = require('chai');
const expect = chai.expect;

describe('Gather Helper', function () {
  it('creates hint for now: full load with travel time', async () => {
    var fifteenMinutes = 15 * 60;
    var twoHours = 2 * 60 * 60;
    var threeHours = 3 * 60 * 60;

    var gatherHint = new GatherHelper().createHint()
      .for({ loadTime: twoHours, loadCapacity: 80000 })
      .in(threeHours).seconds();
    expect(gatherHint).to.not.be.null;
    expect(gatherHint).to.equal("Gather 80000 with travel time 31-55 minutes")
  });

  it('finds the one next gather rss event', async () => {
    var miniEventRotation = new EventRotation(
      0,
      [
        { utc: 0, local: "5pm", name: "Monster Hunt", duration: 1 },
        { utc: 1, local: "6pm", name: "Monster Hunt", duration: 1 },
        { utc: 2, local: "7pm", name: "Monster Hunt", duration: 1 },
        { utc: 3, local: "8pm", name: "Monster Hunt", duration: 1 },
        { utc: 4, local: "9pm", name: "Monster Hunt", duration: 1 },
        { utc: 5, local: "10pm", name: "Monster Hunt", duration: 1 },
        { utc: 6, local: "11pm", name: "Gather RSS", duration: 1 },
      ].sort(function(x,y) { return x.utc - y.utc; })
    )

    var sch = new Schedule().fromHepoch(0).toHepoch(6);
    sch.addRotations([ miniEventRotation ])

    // make sure schedule is setup as expected
    expect(sch.eventsForHepoch(6)[0].name).to.equal("Gather RSS");

    var gatherEvents = new GatherHelper().findEvents().in(sch);
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(1)
    expect(gatherEvents[0].startHepoch).to.equal(6); // missing hepoch
  });


  it('handles no gather rss events', async () => {
    var miniEventRotation = new EventRotation(
      0,
      [
        { utc: 0, local: "5pm", name: "Monster Hunt", duration: 1 },
        { utc: 1, local: "6pm", name: "Monster Hunt", duration: 1 },
        { utc: 2, local: "7pm", name: "Monster Hunt", duration: 1 },
      ].sort(function(x,y) { return x.utc - y.utc; })
    )

    var sch = new Schedule().fromHepoch(0).toHepoch(2);
    sch.addRotations([ miniEventRotation ])

    var gatherEvents = new GatherHelper().findEvents().in(sch);
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(0);
  });


  it('finds multiple gather rss event', async () => {
    var miniEventRotation = new EventRotation(
      0,
      [
        { utc: 0, local: "5pm", name: "Monster Hunt", duration: 1 },
        { utc: 1, local: "6pm", name: "Monster Hunt", duration: 1 },
        { utc: 2, local: "7pm", name: "Gather RSS", duration: 1 },
        { utc: 3, local: "8pm", name: "Monster Hunt", duration: 1 },
        { utc: 4, local: "9pm", name: "Monster Hunt", duration: 1 },
        { utc: 5, local: "10pm", name: "Gather RSS", duration: 1 },
        { utc: 6, local: "11pm", name: "Gather RSS", duration: 1 },
      ].sort(function(x,y) { return x.utc - y.utc; })
    )

    var sch = new Schedule().fromHepoch(0).toHepoch(6);
    sch.addRotations([ miniEventRotation ])

    var gatherEvents = new GatherHelper().findEvents().in(sch);
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(3)
    expect(gatherEvents[0].startHepoch).to.equal(2);
    expect(gatherEvents[1].startHepoch).to.equal(5);
    expect(gatherEvents[2].startHepoch).to.equal(6); 
  });
});
