module.exports = function TrainingHelper(trainingCapacity, powerPerSecond) {
  var helper = {}

  function createHintsFor(hepoch) {
    // var wmcPPS = powerPerSecond.wmc;
    // var sPPS = powerPerSecond.s;
    //
    // var seigeTime = trainingCapacity * sPPS
    //
    //
    // console.log("a" + hepoch);

    return [];
  }

  helper.createHints = function(schedule) {
    var hints = [];
    for (var hepoch = schedule.startHepoch; hepoch <= schedule.endHepoch; hepoch++) {
      var events = schedule.eventsForHepoch(hepoch);
      events.forEach((evt, index) => {
        if (evt.name == "Training") {
          hints.concat(createHintsFor(hepoch));
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


  helper.calculateUnitsFor = function(seconds) {
    return {
      t1: Math.trunc(seconds * powerPerSecond.wmc / (2*1)),
      t2: Math.trunc(seconds * powerPerSecond.wmc / (2*2)),
    }
  }

  return helper;
};
