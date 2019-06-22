'use strict'

const CTime = require('./ctime');
const EventLoader = require('./event_loader')

module.exports = function Clock(utcOffset) {

  var eventLoader = new EventLoader();
  var lunaEventForecaster = eventLoader.load("luna_gifts.compact.json");
  var slot0Forecaster = eventLoader.load("slot0.compact.json");
  var slot1Forecaster = eventLoader.load("slot1.compact.json");
  var slot2Forecaster = eventLoader.load("slot2.compact.json");
  var slot3Forecaster = eventLoader.load("slot3.compact.json");
  var slot4Forecaster = eventLoader.load("slot4.compact.json");

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
      jsonHour.hourly_events = slot0Forecaster.forecastFor(hepoch);
      jsonHour.multi_hour_events = slot1Forecaster.forecastFor(hepoch);
      jsonHour.forecast = {
        slot0: slot0Forecaster.forecastFor(hepoch),
        slot1: slot1Forecaster.forecastFor(hepoch),
        slot2: slot2Forecaster.forecastFor(hepoch),
        slot3: slot3Forecaster.forecastFor(hepoch),
        slot4: slot4Forecaster.forecastFor(hepoch),
      }
      jsonHour.luna_events = lunaEventForecaster.forecastFor(hepoch);
      schedule.hepochs[hepoch] = jsonHour;
    }

    return schedule;
  }
};
