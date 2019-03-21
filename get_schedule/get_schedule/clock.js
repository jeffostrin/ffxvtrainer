'use strict'

const CTime = require('./ctime');
const EventLoader = require('./event_loader')

module.exports = function Clock(utcOffset) {

  var eventLoader = new EventLoader();
  var forecaster = eventLoader.load("mini_events.compact.json");

  this.generate_json = function () {
    var ctime = new CTime(utcOffset);
    var nowHepoch = ctime.epochHour();
    var nowSepoch = ctime.epochSeconds();

    var schedule = {};
    schedule.hepochs = {};
    for (var hepoch = nowHepoch; hepoch <= nowHepoch + 24; hepoch++) {
      var jsonHour = {};
      jsonHour.hepoch = hepoch;
      jsonHour.isCurrentHepoch = (hepoch == nowHepoch);
      jsonHour.dayTime = ctime.pp().dayTime(hepoch);
      jsonHour.relativeTime = ctime.pp().asRelativeTime(hepoch * 60 * 60 - nowSepoch);
      jsonHour.hourly_events = forecaster.forecastFor(hepoch);;
      schedule.hepochs[hepoch] = jsonHour;
    }

    return schedule;
  }
};
