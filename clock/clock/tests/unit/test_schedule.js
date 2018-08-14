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
});
