'use strict'

const fact = require('./fact');

module.exports = function TrainingHelper(trainingOptions, powerPerSecond) {
  var helper = {}

  helper.findNextEvent = function() {
    return {
      in(schedule) {
        var trainingEvents = schedule.findEvents((evt) => evt.name == "Training");
        new fact().value(trainingEvents).is().notNull();
        if (trainingEvents.length == 0) {
          return null;
        }
        return trainingEvents[0];
      }
    };
  }

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

  helper.calculateOptionsFor = function(minSeconds, maxSeconds) {
    var t1MinWarriorAward = calculateAward(minSeconds * powerPerSecond.wmc);
    var t1MaxWarriorAward = calculateAward(maxSeconds * powerPerSecond.wmc);
    var t1MinSeigeAward = calculateAward(minSeconds * powerPerSecond.s);
    var t1MaxSeigeAward = calculateAward(maxSeconds * powerPerSecond.s);

    var minUnits = helper.calculateUnitsFor(minSeconds);
    var maxUnits = helper.calculateUnitsFor(maxSeconds);

    return {
      t1: {
        min: { count: minUnits.t1, warrior: t1MinWarriorAward, seige: t1MinSeigeAward },
        max: { count: maxUnits.t1, warrior: t1MaxWarriorAward, seige: t1MaxSeigeAward },
      },
    };
  }



  helper.calculateUnitsFor = function(seconds) {
    return {
      t1: Math.trunc(seconds * powerPerSecond.wmc / (2*1)),
      t2: Math.trunc(seconds * powerPerSecond.wmc / (2*2)),
    }
  }

  return helper;
};
