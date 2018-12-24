'use strict'

const fact = require('./fact');

module.exports = function TrainingHelper(powerPerSecond) {
  var helper = {}

  function createHintForNow(ctime, hepoch) {
    var secondsUntilEvent = ctime.secondsUntilHepoch(hepoch);

    var minSeconds = secondsUntilEvent + 60; // Extra minute to ensure we get into the hour
    var maxSeconds = secondsUntilEvent + (60 * 55); // Remove 5 minutes so player can send troops

    var maxUnits = helper.calculateUnitsFor(maxSeconds);
    var minUnits = helper.calculateUnitsFor(minSeconds);

    // console.log("now => " + ctime.epochSeconds());
    // console.log("secondsUntilEvent => " + secondsUntilEvent)

    return [ "in next 5 minutes: train " + minUnits.t1 + " to " + maxUnits.t1];
  }

  helper.createHints = function(ctime, schedule) {
    var hints = [];
    for (var hepoch = schedule.startHepoch; hepoch <= schedule.endHepoch; hepoch++) {
      var events = schedule.eventsForHepoch(hepoch);
      events.forEach((evt, index) => {
        if (evt.name == "Training") {
          hints = hints.concat(createHintForNow(ctime, hepoch));
          //hints = hints.concat(createHintsFor(hepoch));
          //
          // console.log(powerPerSecond);
          //
          // console.log("found one for " + hepoch);
        }
      });
    }
    return hints;
  }

  helper.calculateSecondsFor = function(type, targetPower) {
    if (type == "wmc") {
      return Math.ceil(targetPower / powerPerSecond.wmc);
    } else if (type == "s") {
      return Math.ceil(targetPower/ powerPerSecond.s);
    }
    throw "Unknown request type " + type + ", it must be 'wmc' or 's'";
  }

  function calculateAward(power) {
    if (power >= 30000) {
      return "gold";
    } else if (power >= 15000) {
      return "silver";
    } else if (power >= 5000) {
      return "bronze";
    }
    return "none";
  }

  helper.calculateOptionsForTimeframe = function(minSeconds, maxSeconds) {
    // console.log(powerPerSecond.getTrainingTimeInSeconds());
    // console.log(minSeconds);
    if (powerPerSecond.getTrainingTimeInSeconds() < minSeconds) {
      return null;
    }

    var minWarriorAward = calculateAward(minSeconds * powerPerSecond.wmc);
    var maxWarriorAward = calculateAward(maxSeconds * powerPerSecond.wmc);
    var minSeigeAward = calculateAward(minSeconds * powerPerSecond.s);
    var maxSeigeAward = calculateAward(maxSeconds * powerPerSecond.s);

    if (minWarriorAward == "none" && maxWarriorAward == "none" && minSeigeAward == "none" && maxSeigeAward == "none") {
      return null;
    }

    var minUnits = helper.calculateUnitsFor(minSeconds);
    var maxUnits = helper.calculateUnitsFor(maxSeconds);

    return {
      t1: {
        min: { count: minUnits.t1, warrior: minWarriorAward, seige: minSeigeAward },
        max: { count: maxUnits.t1, warrior: maxWarriorAward, seige: maxSeigeAward },
      },
      t2: {
        min: { count: minUnits.t2, warrior: minWarriorAward, seige: minSeigeAward },
        max: { count: maxUnits.t2, warrior: maxWarriorAward, seige: maxSeigeAward },
      },
      t3: {
        min: { count: minUnits.t3, warrior: minWarriorAward, seige: minSeigeAward },
        max: { count: maxUnits.t3, warrior: maxWarriorAward, seige: maxSeigeAward },
      },
    };
  }


  helper.calculateOptionsFor = function(secondsUntilEvent) {
    // cut 5 minutes off the end of an hour
    var endTime = secondsUntilEvent + (60 * 60) - (60 * 5);
    return helper.calculateOptionsForTimeframe(secondsUntilEvent, endTime);
  }

  helper.calculateUnitsFor = function(seconds) {
    return {
      t1: Math.trunc(seconds * powerPerSecond.wmc / (2*1)),
      t2: Math.trunc(seconds * powerPerSecond.wmc / (2*2)),
      t3: Math.trunc(seconds * powerPerSecond.wmc / (2*3)),
    }
  }

  helper._calculateHint = function(trainingSpeed, seconds) {
    console.log(trainingSpeed);
    console.log(seconds);
    return {
      t1Warrior: Math.trunc(seconds * trainingSpeed.t1WarriorSeconds / (2*1)),
      t1Mage: Math.trunc(seconds * trainingSpeed.t1MageSeconds / (2*1)),
      t1Calvary: Math.trunc(seconds * trainingSpeed.t1CalvarySeconds / (2*1)),
      t1Seige: Math.trunc(seconds * trainingSpeed.t1SeigeSeconds / (2*1)),

      t2Warrior: Math.trunc(seconds * trainingSpeed.t1WarriorSeconds / (2*2)),
      t2Mage: Math.trunc(seconds * trainingSpeed.t1MageSeconds / (2*2)),
      t2Calvary: Math.trunc(seconds * trainingSpeed.t1CalvarySeconds / (2*2)),
      t2Seige: Math.trunc(seconds * trainingSpeed.t1SeigeSeconds / (2*2)),

      t3Warrior: Math.trunc(seconds * trainingSpeed.t1WarriorSeconds / (2*3)),
      t3Mage: Math.trunc(seconds * trainingSpeed.t1MageSeconds / (2*3)),
      t3Calvary: Math.trunc(seconds * trainingSpeed.t1CalvarySeconds / (2*3)),
      t3Seige: Math.trunc(seconds * trainingSpeed.t1SeigeSeconds / (2*3)),
    }
  }

  helper.createHint = function() {
    return {
      withOptions(trainingSpeed) {
        new fact().value(trainingSpeed).is().notNull();
        return {
          eventStartsIn(seconds) {
            return {
              seconds() {
                return helper._calculateHint(trainingSpeed, seconds);
              }
            }
          }
        }
      }
    };
  }

  return helper;
};
