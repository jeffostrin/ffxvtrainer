module.exports = {
  create: function(startEpoch, events) {

    events.forEach((event, index) => {
      if (event.name == null) throw "EventRotation.name is required on #{event}";
      if (event.duration == null) throw "EventRotation.duration is required on #{event}";
    });

    cycleTime = 0
    events.forEach((event, index) => {
      cycleTime += event.duration;
    });

    return {
      lookup: function(hourEpoch) {
        var hourInCycle = (hourEpoch - startEpoch) % cycleTime;
        var hourFinder = hourInCycle;

        for (var i = 0; i < events.length; i++) {
          var evt = events[i];
          var duration = evt.duration;
          if (hourFinder < duration) {
            return evt.name;
          }
          hourFinder -= duration;
        }
        throw "Could not find " + hourEpoch + " in " + events;
      }
    };
  }
};
