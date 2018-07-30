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

  helper.calculateSecondsFor = function(params) {
    if (params.type == "wmc") {
      return Math.ceil(params.power / powerPerSecond.wmc);
    } else if (params.type == "s") {
      return Math.ceil(params.power / powerPerSecond.s);
    }
    throw "Unknown request type";
  }

  return helper;
};
