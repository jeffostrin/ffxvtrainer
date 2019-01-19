'use strict';

const CTime = require('../../ctime');
const chai = require('chai');
const expect = chai.expect;

var SECONDS_IN_MINUTE = 60;
var SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
var SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

let PST = -8;


describe('Gets current time', function() {
  it('rounds to nearest hepoch', function() {
    var ctime = new CTime(PST);

    ctime.setSepoch(6 * SECONDS_IN_MINUTE)
    expect(ctime.epochHour()).to.equal(0);

    // expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR)).to.equal("in 1:00");
    // expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE)).to.equal("in 1:05");
    // expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33)).to.equal("in 1:05");
    // expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33.33)).to.equal("in 1:05");
    // expect(ctime.pp().asRelativeTime(2 * SECONDS_IN_DAY + 1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE)).to.equal("in 2:1:05");
  });
});

describe('Tests pretty-printing', function () {
  it('verifies asRelativeTime', async () => {
    var ctime = new CTime(PST);

    // for (var m in ctime) {
    //   console.log(m);
    // }
    expect(ctime.pp().asRelativeTime(-2 * SECONDS_IN_HOUR)).to.equal("past");
    expect(ctime.pp().asRelativeTime(-6 * SECONDS_IN_MINUTE)).to.equal("now");
    expect(ctime.pp().asRelativeTime(6 * SECONDS_IN_MINUTE)).to.equal("in 0:06:00");
    expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR)).to.equal("in 1:00:00");
    expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE)).to.equal("in 1:05:00");
    expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33)).to.equal("in 1:05:33");
    expect(ctime.pp().asRelativeTime(1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE + 33.33)).to.equal("in 1:05:33");
    expect(ctime.pp().asRelativeTime(2 * SECONDS_IN_DAY + 1 * SECONDS_IN_HOUR + 5 * SECONDS_IN_MINUTE)).to.equal("in 2d 1:05:00");
  });

  it('prints day/time', async() => {
    var ctime = new CTime(PST);
    expect(ctime.pp().dayTime(10)).to.equal("02:00am (01-01)");
    expect(ctime.pp().dayTime(11)).to.equal("03:00am (01-01)");
    expect(ctime.pp().dayTime(20)).to.equal("12:00pm (01-01)");
  });

  it('calculates secondsUntil', async() => {
    var ctime = new CTime(PST);
    ctime.setSepoch(0);
    expect(ctime.secondsUntilHepoch(10)).to.equal(10 * SECONDS_IN_HOUR);

    ctime.setSepoch(100 * SECONDS_IN_HOUR);
    expect(ctime.secondsUntilHepoch(105)).to.equal(5 * SECONDS_IN_HOUR);
  });
});
