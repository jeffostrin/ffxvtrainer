'use strict'

module.exports = class EventRotation {
  constructor(startEpoch, events) {

    for (var i = 0; i < events.length; i++) {
      if (events[i].name == null) throw "EventRotation.name is required on #{event}";
      if (events[i].duration == null) throw "EventRotation.duration is required on #{event}";
    }

    this.startEpoch = startEpoch;
    this.events = [ ];

    this.cycleTime = 0
    events.forEach((event, index) => {
      this.events.push({
        name: event.name,
        duration: event.duration,
        cycleStartOffset: this.cycleTime
      })
      this.cycleTime += event.duration;
    });
  }

  lookupEvent(hourEpoch) {
    var e = this._lookupEventFor(hourEpoch);
    var eventStartEpoch = hourEpoch - ( (hourEpoch - this.startEpoch) % this.cycleTime) + e.cycleStartOffset;
    var evt = {
      name: e.name,
      duration: e.duration,
      startHepoch: eventStartEpoch,
    }
    return evt;
  }

  _lookupEventFor(hourEpoch) {
    var hourInCycle = (hourEpoch - this.startEpoch) % this.cycleTime;
    var hourFinder = hourInCycle;

    for (var i = 0; i < this.events.length; i++) {
      var evt = this.events[i];
      var duration = evt.duration;
      if (hourFinder < duration) {
        return evt;
      }
      hourFinder -= duration;
    }
    throw "Could not find " + hourEpoch + " in " + events;
  }


};
