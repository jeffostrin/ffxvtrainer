const fact = require('./fact');
const CTime = require('./ctime');

module.exports = function GatherHelper() {
  var helper = {}
  var TWO_AND_A_HALF_HOURS = (2 * 60 * 60) + (30 * 60);


  helper._calculateHint = function(loadTime, loadCapacity, seconds) {
    var bufferMinutes = 60 * 60;
    var minTravelSeconds = Math.ceil((seconds - loadTime) / 2) + 1;
    if (minTravelSeconds > TWO_AND_A_HALF_HOURS) {
      return null;
    }

    var maxTravelSeconds = Math.floor((seconds - loadTime + bufferMinutes) / 2) - 5;
    if (maxTravelSeconds < 0) {
      return null;
    }

    return {
      load: loadCapacity,
      loadTime: loadTime,
      travelTime: { minSeconds: minTravelSeconds, maxSeconds: maxTravelSeconds },
    }
  }

  function hintToText(hint) {
    if (hint == null) {
      return null;
    }
    var min = new CTime().pp().asFutureTime(hint.travelTime.minSeconds); // need seconds
    var max = new CTime().pp().asFutureTime(hint.travelTime.maxSeconds);
    return "Travel between " + min + " and " + max + 
           " seconds and gather " + hint.load;
  }

  function createHintForNow(loadTime, loadCapacity, seconds) {
    var hint = helper._calculateHint(loadTime, loadCapacity, seconds);
    var hintText = hintToText(hint);
    return hintText;
  }

  helper.createHint = function() {
    return {
      for(gatherParams) {
        new fact().value(gatherParams).is().notNull();
        new fact().value(gatherParams.loadTime).is().notNull();
        new fact().value(gatherParams.loadCapacity).is().notNull();
        return {
          eventStartsIn(seconds) {
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
