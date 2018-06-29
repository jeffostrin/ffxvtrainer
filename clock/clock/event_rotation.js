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

  createSchedule2(firstHourEpoch, lastHourEpoch) {
    var result = [];

    var hourEpoch = firstHourEpoch;
    do {

      var e = this._lookup(hourEpoch);
      var eventStartEpoch = hourEpoch - ( (hourEpoch - this.startEpoch) % this.cycleTime) + e.cycleStartOffset;
      var eventEndEpoch = eventStartEpoch + e.duration - 1;
      //console.log("event start time: " + eventStartTime);
      var elapsed = hourEpoch - eventStartEpoch;
      var outsideSchedule = 0;
      if (lastHourEpoch < eventEndEpoch) {
        outsideSchedule = eventEndEpoch - lastHourEpoch;
      }
      //console.log("firstHourEpoch: " + firstHourEpoch + " lastHourEpoch:" + lastHourEpoch + " hourEpoch:" + hourEpoch + " eventStartEpoch:" + eventStartEpoch + " elapsed:" + elapsed + " outsideSchedule:"+outsideSchedule);
      var evt = {
        startHourEpoch: hourEpoch,
        endHourEpoch: hourEpoch + e.duration - elapsed - outsideSchedule - 1,
        name: e.name
      };
      result.push(evt)
      hourEpoch += e.duration - elapsed;

    } while (hourEpoch <= lastHourEpoch);

    return result;
  }

  _lookup(hourEpoch) {
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
