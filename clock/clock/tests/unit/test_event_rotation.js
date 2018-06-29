'use strict';

const EventRotation = require('../../event_rotation');
const chai = require('chai');
const expect = chai.expect;


describe('Tests lookup', function () {
  it('verifies luna schedule', async () => {
    var lunaRotation = new EventRotation(
      0,
      [ { name: "", duration: 2 },
        { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 1 },
      ]);

    expect(lunaRotation.lookup(0)).to.equal("")
    expect(lunaRotation.lookup(1)).to.equal("")
    expect(lunaRotation.lookup(2)).to.equal("Luna Gifts")
    expect(lunaRotation.lookup(3)).to.equal("")
    expect(lunaRotation.lookup(4)).to.equal("")
    expect(lunaRotation.lookup(5)).to.equal("")
    expect(lunaRotation.lookup(6)).to.equal("Luna Gifts")
    expect(lunaRotation.lookup(7)).to.equal("")
    expect(lunaRotation.lookup(8)).to.equal("")
    expect(lunaRotation.lookup(9)).to.equal("")
    expect(lunaRotation.lookup(10)).to.equal("Luna Gifts")
    expect(lunaRotation.lookup(11)).to.equal("")
  });

  it('verifies 4 hour rotation schedule', async () => {
    var fourHourEventRotation = new EventRotation(
      0,
      [ { name: "Empire Ascend", duration: 4 },
        { name: "Research", duration: 4, },
      ]);

    expect(fourHourEventRotation.lookup(0)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(1)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(2)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(3)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(4)).to.equal("Research")
    expect(fourHourEventRotation.lookup(5)).to.equal("Research")
    expect(fourHourEventRotation.lookup(6)).to.equal("Research")
    expect(fourHourEventRotation.lookup(7)).to.equal("Research")
    expect(fourHourEventRotation.lookup(8)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(9)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(10)).to.equal("Empire Ascend")
    expect(fourHourEventRotation.lookup(11)).to.equal("Empire Ascend")
  });
});


function assertEvent(actual, expected) {
  expect(expected.hourEpoch).to.equal(actual.hourEpoch);
  expect(expected.name).to.equal(actual.name);
}

function assertEvent2(actual, expected) {
  expect(expected.startHourEpoch).to.equal(actual.startHourEpoch);
  expect(expected.endHourEpoch).to.equal(actual.endHourEpoch);
  expect(expected.name).to.equal(actual.name);
}


describe('Tests createSchedule', function () {
  it('verifies creates a schedule', async () => {
    var lunaRotation = new EventRotation(
      0,
      [ { name: "", duration: 2 },
        { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 1 },
      ]);

    var schedule = lunaRotation.createSchedule(10, 15);
    expect(schedule.length).to.equal(6);
    assertEvent(schedule[0], { hourEpoch:10, name:"Luna Gifts"});
    assertEvent(schedule[1], { hourEpoch:11, name:""});
    assertEvent(schedule[2], { hourEpoch:12, name:""});
    assertEvent(schedule[3], { hourEpoch:13, name:""});
    assertEvent(schedule[4], { hourEpoch:14, name:"Luna Gifts"});
    assertEvent(schedule[5], { hourEpoch:15, name:""});
  })
});


describe('Tests createSchedule2', function () {
  it('verifies creates a schedule', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);

    var schedule = lunaRotation.createSchedule2(10, 15);
    expect(schedule.length).to.equal(4);
    assertEvent2(schedule[0], { startHourEpoch:10, endHourEpoch: 10, name:"Luna Gifts" });
    assertEvent2(schedule[1], { startHourEpoch:11, endHourEpoch: 13, name:"" });
    assertEvent2(schedule[2], { startHourEpoch:14, endHourEpoch: 14, name:"Luna Gifts"});
    assertEvent2(schedule[3], { startHourEpoch:15, endHourEpoch: 15, name:""});
  }),
  it('verifies creates a schedule when event starts and ends off schedule boundaries', async () => {
    var fourHourEventRotation = new EventRotation(
      0,
      [ { name: "Empire Ascend", duration: 4 },
        { name: "Research", duration: 4, },
      ]);

    var schedule = fourHourEventRotation.createSchedule2(9, 14);
    expect(schedule.length).to.equal(2);
    assertEvent2(schedule[0], { startHourEpoch:9, endHourEpoch: 11, name:"Empire Ascend" });
    assertEvent2(schedule[1], { startHourEpoch:12, endHourEpoch: 14, name:"Research" });

    // expect(fourHourEventRotation.lookup(6)).to.equal("Research")
    // expect(fourHourEventRotation.lookup(7)).to.equal("Research")
    // expect(fourHourEventRotation.lookup(8)).to.equal("Empire Ascend")
    // expect(fourHourEventRotation.lookup(9)).to.equal("Empire Ascend")
    // expect(fourHourEventRotation.lookup(10)).to.equal("Empire Ascend")
    // expect(fourHourEventRotation.lookup(11)).to.equal("Empire Ascend")

  })
});
