const fact = require('./fact');

module.exports = function GatherHelper() {
  var helper = {}

  function createHintForNow(loadTime, loadCapacity, seconds) {
    var bufferMinutes = 60 * 60;
    //console.log(loadTime.toString() + " " + loadCapacity.toString() + " " + seconds.toString());
    var minTravelSeconds = Math.ceil((seconds - loadTime) / 2 / 60) + 1;
    var maxTravelSeconds = Math.floor((seconds - loadTime + bufferMinutes) / 2 / 60) - 5;
    return "Gather " + loadCapacity.toString() + " with travel time " + minTravelSeconds.toString() + "-" + maxTravelSeconds.toString() + " minutes";
  }

  helper.createHint = function() {
    return {
      for(gatherParams) {
        new fact().value(gatherParams).is().notNull();
        new fact().value(gatherParams.loadTime).is().notNull();
        new fact().value(gatherParams.loadCapacity).is().notNull();
        return {
          in(seconds) {
            return {
              seconds() {
                return createHintForNow(gatherParams.loadTime, gatherParams.loadCapacity, seconds);
              }
            }
          }
        }
      }
    };
  }

  helper.findEvents = function() {
    return {
      in(schedule) {
        return schedule.findEvents((evt) => evt.name == "Gather RSS");
      }
    };
  }

  return helper;
};
