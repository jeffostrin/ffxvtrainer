'use strict'

const fact = require('../fact');
const TimeConstants = require('../time_constants')

var tc = new TimeConstants();

module.exports = function TrainingSpeed(powerPerSecond) {
  var instance = {};

  function asNum(n, def) {
    if (isNaN(n)) {
      return def;
    }
    return n;
  }

  function calculateSeconds(days, hours, minutes, seconds) {
    //console.log(days + "d " + hours + ":" + minutes + ":" + seconds);
    return  asNum(days, 0) * tc.SECONDS_IN_DAY +
            hours * tc.SECONDS_IN_HOUR +
            minutes * tc.SECONDS_IN_MINUTE +
            seconds;
  }

  function parseIntoSeconds(s) {
    var dateRegex = /(([0-9]+)d)?[ ]?(\d{0,2}):(\d{2}):(\d{2})/
    var match = dateRegex.exec(s);
    var seconds = calculateSeconds(parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5]));
    return seconds;
  }

  instance.Parse = function(queueSize, warriorTime, mageTime, calvaryTime, seigeTime) {
    var qsize = parseInt(queueSize);
    var warriorSeconds = parseIntoSeconds(warriorTime);
    var mageSeconds = parseIntoSeconds(mageTime);
    var calvarySeconds = parseIntoSeconds(calvaryTime);
    var seigeSeconds = parseIntoSeconds(seigeTime);
    return instance.Create(qsize, warriorSeconds, mageSeconds, calvarySeconds, seigeSeconds);
  }

  instance.Create = function(trainingQueueSize, t1WarriorSeconds, t1MageSeconds, t1CalvarySeconds, t1SeigeSeconds) {
    return {
      queueSize: trainingQueueSize,
      t1: {
        warrior: t1WarriorSeconds,
        mage: t1MageSeconds,
        calvary: t1CalvarySeconds,
        seige: t1SeigeSeconds,
      }
    }
  }

  return instance;
};
