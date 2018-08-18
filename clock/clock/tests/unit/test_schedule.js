'use strict';

const Schedule = require('../../schedule');
const EventRotation = require('../../event_rotation');
const chai = require('chai');
const expect = chai.expect;

function events(actual) {
  return {
    contains(expected) {
      expected.forEach((expectedEvent, index) => {
        expect(actual).to.deep.include(expectedEvent);
      });
    }
  }
}

describe('Schedule Creation', function () {

  it('adds a single event rotation', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);

    var sch = new Schedule().fromHepoch(5).toHepoch(8);
    sch.addRotations([lunaRotation]);

    events(sch.eventsForHepoch(5)).contains([{ name: "", isEventStart: false, startHepoch: 3 }]);
    events(sch.eventsForHepoch(6)).contains([{ name: "Luna Gifts", isEventStart: true, startHepoch: 6 }]);
  });


  it('adds multiple event rotations', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);
    var fourHourEventRotation = new EventRotation(
      0,
      [ { name: "Empire Ascend", duration: 4 },
        { name: "Research", duration: 4, },
      ]);

    var sch = new Schedule().fromHepoch(5).toHepoch(8);
    sch.addRotations([lunaRotation, fourHourEventRotation]);

    events(sch.eventsForHepoch(5)).contains([
      { name: "", isEventStart: false, startHepoch: 3 },
      { name: "Research", isEventStart: false, startHepoch: 4 }
    ]);

    events(sch.eventsForHepoch(6)).contains([
      { name: "Luna Gifts", isEventStart: true, startHepoch: 6 },
      { name: "Research", isEventStart: false, startHepoch: 4 }
    ]);

    events(sch.eventsForHepoch(7)).contains([
      { name: "", isEventStart: true, startHepoch: 7 },
      { name: "Research", isEventStart: false, startHepoch: 4 }
    ]);

    events(sch.eventsForHepoch(8)).contains([
      { name: "", isEventStart: false, startHepoch: 7 },
      { name: "Empire Ascend", isEventStart: true, startHepoch: 8 }
    ]);
  });


  it('gracefully returns empty collection for find() when nothing matches', async () => {
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
    var gatherEvents = sch.findEvents((evt) => evt.name == "Gather RSS");
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(0);
  });

  it('finds a single instance of an named event', async () => {
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
    var gatherEvents = sch.findEvents((evt) => evt.name == "Gather RSS");
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(1);
    expect(gatherEvents[0].startHepoch).to.equal(6);
  });

  it('finds multiple named events', async () => {
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

    var gatherEvents = sch.findEvents((evt) => evt.name == "Gather RSS");
    expect(gatherEvents).to.not.be.null;
    expect(gatherEvents.length).to.equal(3)
    expect(gatherEvents[0].startHepoch).to.equal(2);
    expect(gatherEvents[1].startHepoch).to.equal(5);
    expect(gatherEvents[2].startHepoch).to.equal(6);
  });
});
