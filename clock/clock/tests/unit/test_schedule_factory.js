'use strict';

const ScheduleFactory = require('../../schedule_factory');
const CTime = require('../../ctime');
const chai = require('chai');
const expect = chai.expect;

function assertHourlySchedule(actual, expected) {
  expect(actual.hepoch).to.equal(expected.hepoch);
  expect(actual.isCurrentHepoch).to.equal(expected.isCurrentHepoch);
  expect(actual.hepochReadable).to.equal(expected.hepochReadable);
  expect(actual.secondsUntil).to.equal(expected.secondsUntil);
}

describe('Tests lookup', function () {
  it('create simple schedule', async () => {
    var ctime = new CTime();
    ctime.setSepoch(30*60*60);
    var eventRotations = null;
    var schedule = new ScheduleFactory().at(ctime).forHepochs(30, 35).forEventRotations(eventRotations).create();

    expect(schedule.length).to.equal(6)
    assertHourlySchedule(schedule[0], { hepoch:30, isCurrentHepoch: true, hepochReadable: "10:00pm (01-01)", secondsUntil: 0 });
    assertHourlySchedule(schedule[1], { hepoch:31, isCurrentHepoch: false, hepochReadable: "11:00pm (01-01)", secondsUntil: 60 * 60 });

    // var s = [
    //
    //   { hepoch: 10, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", [ "Training", "", "Empire Ascend", "New Rotation" ] },
    //   { hepoch: 11, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", [ "Training", "Luna Gifts", "Empire Ascend" ] },
    //
    //   { hepoch: 10, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", events: { mini: "Training", fourHour: "Empire Ascend", other:"New Rotation" } },
    //   { hepoch: 11, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", events: { mini: "Training", luna:"Luna Gifts", fourHour: "Empire Ascend" } },
    //
    // ]

  });

  it('verifies 4 hour rotation schedule', async () => {
  });
});
