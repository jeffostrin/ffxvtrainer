'use strict'

module.exports = class EventRotation {
  constructor(startEpoch, events) {

    for (var i = 0; i < events.length; i++) {
      if (events[i].name == null) throw "EventRotation.name is required on #{event}";
      if (events[i].duration == null) throw "EventRotation.duration is required on #{event}";
    }

    this.startEpoch = startEpoch;
    this.events = events;

    this.cycleTime = 0
    events.forEach((event, index) => {
      this.cycleTime += event.duration;
    });
  }

  lookup(hourEpoch) {
    var hourInCycle = (hourEpoch - this.startEpoch) % this.cycleTime;
    var hourFinder = hourInCycle;

    for (var i = 0; i < this.events.length; i++) {
      var evt = this.events[i];
      //console.log(evt.name + " " + evt.duration)
      var duration = evt.duration;
      if (hourFinder < duration) {
        return evt.name;
      }
      hourFinder -= duration;
    }
    throw "Could not find " + hourEpoch + " in " + events;
  }

  createSchedule(firstHourEpoch, lastHourEpoch) {
    var result = [];
    for (var hourEpoch = firstHourEpoch; hourEpoch <= lastHourEpoch; hourEpoch++) {
      var evt = {
        hourEpoch: hourEpoch,
        name: this.lookup(hourEpoch)
      };
      result.push(evt)
    }
    return result;
  }
};
