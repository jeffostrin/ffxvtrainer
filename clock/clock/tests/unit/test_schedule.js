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

describe('Tests add', function () {

  it('adds a single', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);

    var sch = new Schedule().fromHepoch(5).toHepoch(8);
    sch.addRotation(lunaRotation);

    events(sch.eventsForHepoch(5)).contains([{ name: "", isEventStart: false }]);
    events(sch.eventsForHepoch(6)).contains([{ name: "Luna Gifts", isEventStart: true }]);
  });


  it('adds multiple', async () => {
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
    sch.addRotation(lunaRotation);
    sch.addRotation(fourHourEventRotation);

    events(sch.eventsForHepoch(5)).contains([
      { name: "", isEventStart: false },
      { name: "Research", isEventStart: false }
    ]);

    events(sch.eventsForHepoch(6)).contains([
      { name: "Luna Gifts", isEventStart: true },
      { name: "Research", isEventStart: false }
    ]);

    events(sch.eventsForHepoch(7)).contains([
      { name: "", isEventStart: true },
      { name: "Research", isEventStart: false }
    ]);

    events(sch.eventsForHepoch(8)).contains([
      { name: "", isEventStart: false },
      { name: "Empire Ascend", isEventStart: true }
    ]);
  });
});
