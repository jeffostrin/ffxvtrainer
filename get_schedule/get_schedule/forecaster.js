'use strict'

module.exports = function Forecaster() {
  var forecaster = {};

  forecaster._forecast = function(hourlyEvents, hepoch) {
    var result = {};
    for (var day = 0; day < 100; day++) {
      var targetHepoch = hepoch - (day * 24);
      if (hourlyEvents[targetHepoch] == null) {
        continue;
      }
      // console.log("for " + hepoch + " inspecting " + targetHepoch);
      // console.log(result);
      var events = hourlyEvents[targetHepoch];
      events.forEach(function(evt) {
        if (result[evt] == null) {
          result[evt] = 0;
        }
        result[evt] = result[evt] + 1;
      });
    }

    return result;
  }

  forecaster.create = function(hourlyEvents) {
    return {
      forecastFor(hepoch) {
        return forecaster._forecast(hourlyEvents, hepoch);
      }
    };
  }

  return forecaster;
}
