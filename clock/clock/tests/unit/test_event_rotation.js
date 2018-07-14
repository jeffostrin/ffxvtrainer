'use strict';

const EventRotation = require('../../event_rotation');
const chai = require('chai');
const expect = chai.expect;


function assertEvent(actual, expected) {
  expect(expected.startHepoch).to.equal(actual.startHepoch);
  expect(expected.name).to.equal(actual.name);
}

describe('Tests lookup event', function () {
  it('verifies luna schedule', async () => {
    var lunaRotation = new EventRotation(
      2,
      [ { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 3 },
      ]);

    assertEvent(lunaRotation.lookupEvent(2), { name: "Luna Gifts", startHepoch: 2 });
    assertEvent(lunaRotation.lookupEvent(3), { name: "", startHepoch: 3 });
    assertEvent(lunaRotation.lookupEvent(4), { name: "", startHepoch: 3 });
    assertEvent(lunaRotation.lookupEvent(5), { name: "", startHepoch: 3 });
    assertEvent(lunaRotation.lookupEvent(6), { name: "Luna Gifts", startHepoch: 6 });
    assertEvent(lunaRotation.lookupEvent(7), { name: "", startHepoch: 7 });
    assertEvent(lunaRotation.lookupEvent(8), { name: "", startHepoch: 7 });
    assertEvent(lunaRotation.lookupEvent(9), { name: "", startHepoch: 7 });
    assertEvent(lunaRotation.lookupEvent(10), { name: "Luna Gifts", startHepoch: 10 });
    assertEvent(lunaRotation.lookupEvent(11), { name: "", startHepoch: 11 });
  });

  it('verifies 4 hour rotation schedule', async () => {
    var fourHourEventRotation = new EventRotation(
      0,
      [ { name: "Empire Ascend", duration: 4 },
        { name: "Research", duration: 4, },
      ]);

    assertEvent(fourHourEventRotation.lookupEvent(0), { name: "Empire Ascend", startHepoch: 0 });
    assertEvent(fourHourEventRotation.lookupEvent(1), { name: "Empire Ascend", startHepoch: 0 });
    assertEvent(fourHourEventRotation.lookupEvent(2), { name: "Empire Ascend", startHepoch: 0 });
    assertEvent(fourHourEventRotation.lookupEvent(3), { name: "Empire Ascend", startHepoch: 0 });
    assertEvent(fourHourEventRotation.lookupEvent(4), { name: "Research", startHepoch: 4 });
    assertEvent(fourHourEventRotation.lookupEvent(5), { name: "Research", startHepoch: 4 });
    assertEvent(fourHourEventRotation.lookupEvent(6), { name: "Research", startHepoch: 4 });
    assertEvent(fourHourEventRotation.lookupEvent(7), { name: "Research", startHepoch: 4 });
    assertEvent(fourHourEventRotation.lookupEvent(8), { name: "Empire Ascend", startHepoch: 8 });
    assertEvent(fourHourEventRotation.lookupEvent(9), { name: "Empire Ascend", startHepoch: 8 });
    assertEvent(fourHourEventRotation.lookupEvent(10), { name: "Empire Ascend", startHepoch: 8 });
    assertEvent(fourHourEventRotation.lookupEvent(11), { name: "Empire Ascend", startHepoch: 8 });
  });
});
