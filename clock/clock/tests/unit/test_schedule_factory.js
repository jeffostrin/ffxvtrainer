'use strict';

const ScheduleFactory = require('../../schedule_factory');
const EventRotation = require('../../event_rotation');
const CTime = require('../../ctime');
const chai = require('chai');
const expect = chai.expect;

function assertHourlySchedule(actual, expected) {
  expect(actual.hepoch).to.equal(expected.hepoch);
  expect(actual.isCurrentHepoch).to.equal(expected.isCurrentHepoch);
  expect(actual.hepochReadable).to.equal(expected.hepochReadable);
  expect(actual.secondsUntil).to.equal(expected.secondsUntil);
  expect(actual.timeUntil).to.equal(expected.timeUntil);
  expect(actual.events.mini).to.equal(expected.events.mini);
  expect(actual.events.luna).to.equal(expected.events.luna);
  expect(actual.events.fourHour).to.equal(expected.events.fourHour);
  expect(actual.events.other).to.equal(expected.events.other);
}

describe('Tests lookup', function () {

  var SECONDS_IN_HOUR = 60 * 60;

  var lunaRotation = new EventRotation(
    0,
    [ { name: "", duration: 2 },
      { name: "Luna Gifts", duration: 1 },
      { name: "", duration: 1 },
    ]);
  var fourHourEventRotation = new EventRotation(
    0,
    [ { name: "Empire Ascend", duration: 4 },
      { name: "Research", duration: 4, },
    ]);

  it('create simple schedule', async () => {
    var ctime = new CTime();
    ctime.setSepoch(30 * SECONDS_IN_HOUR);
    var eventRotations = {
      luna: lunaRotation,
      fourHour: fourHourEventRotation
    };
    var schedule = new ScheduleFactory().at(ctime).forHepochs(30, 35).forEventRotations(eventRotations).create();

console.log(schedule);
    expect(schedule.length).to.equal(6)
    assertHourlySchedule(schedule[0], { hepoch:30, isCurrentHepoch: true, hepochReadable: "10:00pm (01-01)", secondsUntil: 0, timeUntil: "now", events: { luna: "", fourHour: "Research (cont)"} });
    assertHourlySchedule(schedule[1], { hepoch:31, isCurrentHepoch: false, hepochReadable: "11:00pm (01-01)", secondsUntil: 1 * SECONDS_IN_HOUR, timeUntil: "in 1:00", events: { luna: "Luna", fourHour: "Research (cont)" } });
    assertHourlySchedule(schedule[2], { hepoch:32, isCurrentHepoch: false, hepochReadable: "12:00am (01-02)", secondsUntil: 2 * SECONDS_IN_HOUR, timeUntil: "in 2:00", events: { luna: "", fourHour: "Empire Ascend" } });

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
