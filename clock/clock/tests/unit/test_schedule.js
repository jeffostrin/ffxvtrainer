'use strict';

const Schedule = require('../../schedule');
const EventRotation = require('../../event_rotation');
const chai = require('chai');
const expect = chai.expect;

describe('Tests add', function () {

  it('adds a single', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);

    var sch = new Schedule().fromHepoch(5).toHepoch(8);
    sch.addRotation(lunaRotation);

    expect(sch.eventsForHepoch(5)).to.deep.include( { name: "", isEventStart: false });
    expect(sch.eventsForHepoch(6)).to.deep.include( { name: "Luna Gifts", isEventStart: true });
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

    expect(sch.eventsForHepoch(5)).to.deep.include( { name: "", isEventStart: false });
    expect(sch.eventsForHepoch(5)).to.deep.include( { name: "Research", isEventStart: false });

    expect(sch.eventsForHepoch(6)).to.deep.include( { name: "Luna Gifts", isEventStart: true });
    expect(sch.eventsForHepoch(6)).to.deep.include( { name: "Research", isEventStart: false });

    expect(sch.eventsForHepoch(7)).to.deep.include( { name: "", isEventStart: true });
    expect(sch.eventsForHepoch(7)).to.deep.include( { name: "Research", isEventStart: false });

    expect(sch.eventsForHepoch(8)).to.deep.include( { name: "", isEventStart: false });
    expect(sch.eventsForHepoch(8)).to.deep.include( { name: "Empire Ascend", isEventStart: true });
  });
});
