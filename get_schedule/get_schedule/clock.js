'use strict'

const CTime = require('./ctime');
const EventLoader = require('./event_loader')

module.exports = function Clock() {

  var eventLoader = new EventLoader();
  var forecaster = eventLoader.load();

  this.generate_json = function () {
    var ctime = new CTime();
    var nowHepoch = ctime.epochHour();
    var nowSepoch = ctime.epochSeconds();

    var schedule = {};
    schedule.events = {};
    for (var hepoch = nowHepoch; hepoch <= nowHepoch + 24; hepoch++) {
      var jsonHour = {};
      jsonHour.hepoch = hepoch;
      jsonHour.isCurrentHepoch = (hepoch == nowHepoch);
      jsonHour.dayTime = ctime.pp().dayTime(hepoch);
      jsonHour.relativeTime = ctime.pp().asRelativeTime(hepoch * 60 * 60 - nowSepoch);
      jsonHour.events = forecaster.forecastFor(hepoch);;
      schedule.events[hepoch] = jsonHour;
    }

    return schedule;
  }
};
