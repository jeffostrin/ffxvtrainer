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

  createSchedule(firstHepoch, lastHepoch) {
    var result = [];
    for (var hourEpoch = firstHepoch; hourEpoch <= lastHepoch; hourEpoch++) {
      var evt = {
        hourEpoch: hourEpoch,
        name: this.lookup(hourEpoch)
      };
      result.push(evt)
    }
    return result;
  }

  createSchedule2(firstHepoch, lastHepoch) {
    var result = [];

    var hourEpoch = firstHepoch;
    do {

      var e = this._lookupEventFor(hourEpoch);
      var eventStartEpoch = hourEpoch - ( (hourEpoch - this.startEpoch) % this.cycleTime) + e.cycleStartOffset;
      var eventEndEpoch = eventStartEpoch + e.duration - 1;
      var elapsedHours = hourEpoch - eventStartEpoch;
      var hoursOutsideSchedule = 0;
      if (lastHepoch < eventEndEpoch) {
        hoursOutsideSchedule = eventEndEpoch - lastHepoch;
      }
      //console.log("firstHepoch: " + firstHepoch + " lastHepoch:" + lastHepoch + " hourEpoch:" + hourEpoch + " eventStartEpoch:" + eventStartEpoch + " elapsedHours:" + elapsedHours + " hoursOutsideSchedule:"+hoursOutsideSchedule);
      var evt = {
        startHourEpoch: hourEpoch,
        endHourEpoch: hourEpoch + e.duration - elapsedHours - hoursOutsideSchedule - 1,
        name: e.name
      };
      result.push(evt)
      hourEpoch += e.duration - elapsedHours;

    } while (hourEpoch <= lastHepoch);

    return result;
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
