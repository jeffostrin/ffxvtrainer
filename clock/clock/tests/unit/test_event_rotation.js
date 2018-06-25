'use strict';

const EventRotation = require('../../event_rotation');
const chai = require('chai');
const expect = chai.expect;


describe('Tests index', function () {
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
});


describe('Tests index', function () {
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
