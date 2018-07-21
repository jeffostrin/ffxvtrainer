'use strict'

const CTime = require('./ctime');
var EventRotation = require('./event_rotation')
var RVR = require('./rvr')
var consoleView = require('./console_output')
const Schedule = require('./schedule');

var GatherRSS = "Gather RSS <==="
var Training = "Training <==="

var monster_hunt = "Monster Hunt <==="
var spin = "Spin the Wheel"
var secret = "Secret Gift"
var guild_defend = "Guild Defend"
var guild_quests = "Guild Quests"
var guild_rss_help = "Guild RSS Help"
var guild_help = "Guild Help"
var hero_quests = "Hero Quests"
var unknown = "Unknown"


module.exports = function Clock() {
  var clock = {}

  clock.ctime = new CTime();
  clock.nowHepoch = clock.ctime.epochHour();
  clock.nowSepoch = clock.ctime.epochSeconds();

  var miniEventRotation = new EventRotation(
    0,
    [
      { utc: 7, local: "12am", name: secret, duration: 1 },
      { utc: 8, local: "1am", name: hero_quests, duration: 1 },
      { utc: 9, local: "2am", name: GatherRSS, duration: 1 },
      { utc: 10, local: "3am", name: unknown, duration: 1 },
      { utc: 11, local: "4am", name: unknown, duration: 1 },
      { utc: 12, local: "5am", name: Training, duration: 1 },
      { utc: 13, local: "6am", name: monster_hunt, duration: 1 },
      { utc: 14, local: "7am", name: guild_rss_help, duration: 1 },
      { utc: 15, local: "8am", name: guild_quests, duration: 1 },
      { utc: 16, local: "9am", name: guild_rss_help, duration: 1 },
      { utc: 17, local: "10am", name: guild_defend, duration: 1 },
      { utc: 18, local: "11am", name: spin, duration: 1 },
      { utc: 19, local: "12pm", name: secret, duration: 1 },
      { utc: 20, local: "1pm", name: hero_quests, duration: 1 },
      { utc: 21, local: "2pm", name: GatherRSS, duration: 1 },
      { utc: 22, local: "3pm", name: guild_quests, duration: 1 },
      { utc: 23, local: "4pm", name: guild_help, duration: 1 },

      { utc: 0, local: "5pm", name: Training, duration: 1 },
      { utc: 1, local: "6pm", name: monster_hunt, duration: 1 },
      { utc: 2, local: "7pm", name: guild_rss_help, duration: 1 },
      { utc: 3, local: "8pm", name: guild_quests, duration: 1 },
      { utc: 4, local: "9pm", name: guild_rss_help, duration: 1 },
      { utc: 5, local: "10pm", name: guild_defend, duration: 1 },
      { utc: 6, local: "11pm", name: spin, duration: 1 },
    ].sort(function(x,y) { return x.utc - y.utc; })
  )

  var lunaRotation = new EventRotation(
    0,
    [ { name: "", duration: 2 },
      { name: "Luna Gifts", duration: 1 },
      { name: "", duration: 1 },
    ]);

  var fourHourEventRotation = new EventRotation(
    0,
    [ { name: "Empire Ascend", duration: 4 },
      { name: "Research", duration: 4, },
    ]);

  var eventRotations = {
    luna: lunaRotation,
    fourHour: fourHourEventRotation
  };

  clock.sch = new Schedule().fromHepoch(clock.nowHepoch).toHepoch(clock.nowHepoch + 24);
  clock.sch.addRotation(miniEventRotation);
  clock.sch.addRotation(lunaRotation);
  clock.sch.addRotation(fourHourEventRotation);

  var rvr = new RVR();
  clock.nextRVR = rvr.calculate_next(clock.ctime.epochSeconds());

  this.generate_console = function () {
    var schedule = [
      consoleView.currentTime(clock.ctime),
      consoleView.nextRVR(clock.ctime, clock.nextRVR)
    ];

    for (var hepoch = clock.nowHepoch; hepoch <= clock.nowHepoch + 24; hepoch++) {
      var hourEvents = clock.sch.eventsForHepoch(hepoch);

      var consoleHour = "   ";
      var padding = "-";
      if (hepoch == clock.nowHepoch) {
        consoleHour = "=> ";
        padding = "=";
      }

      var timestamp = clock.ctime.pp().dayTime(hepoch) + " (" + clock.ctime.pp().asRelativeTime(hepoch * 60 * 60 - clock.nowSepoch) + ") "
      consoleHour += timestamp.padEnd(28, padding) + " ";

      hourEvents.forEach((evt, index) => {
        var eventName = (evt.name == "") ? "" : (evt.name + " ");
        if (evt.name != "" && !evt.isEventStart) {
          eventName += "(cont)";
        }
        consoleHour += eventName.padEnd(20, padding) + " ";
      });

      if (hepoch == clock.nowHepoch) {
        consoleHour += " <=";
      }

      schedule.push(consoleHour);
    }

    // schedule = schedule.concat( [
    //   '=> 05:00pm (06-24) (now) ===== Training <=== ==== ============== Empire Ascend  ["New Rotation / Major Events may end"]  <=',
    //   "   06:00pm (06-24) (in 0:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   07:00pm (06-24) (in 1:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
    //   "   08:00pm (06-24) (in 2:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   09:00pm (06-24) (in 3:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   10:00pm (06-24) (in 4:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   11:00pm (06-24) (in 5:10) - Unknown ---------- Luna Gifts---- Research ----- [] -----------",
    //   "   12:00am (06-25) (in 6:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   01:00am (06-25) (in 7:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   02:00am (06-25) (in 8:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   03:00am (06-25) (in 9:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
    //   "   04:00am (06-25) (in 10:10)  Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   05:00am (06-25) (in 11:10)  Unknown ---------- -------------- Research ----- [] -----------",
    //   "   06:00am (06-25) (in 12:10)  Unknown ---------- -------------- Research ----- [] -----------",
    // ]);
    return schedule;
  }


  this.generate_json = function () {
    var schedule = {};
    schedule.currentTime = consoleView.currentTime(clock.ctime);
    schedule.nextRVR = consoleView.nextRVR(clock.ctime, clock.nextRVR);
    schedule.events = {};

    for (var hepoch = clock.nowHepoch; hepoch <= clock.nowHepoch + 24; hepoch++) {
      var hourEvents = clock.sch.eventsForHepoch(hepoch);

      var jsonHour = {};
      jsonHour.hepoch = hepoch;
      jsonHour.isCurrentHepoch = (hepoch == clock.nowHepoch);
      jsonHour.dayTime = clock.ctime.pp().dayTime(hepoch);
      jsonHour.relativeTime = clock.ctime.pp().asRelativeTime(hepoch * 60 * 60 - clock.nowSepoch);

      jsonHour.events = [];
      hourEvents.forEach((evt, index) => {
        var eventName = (evt.name == "") ? "" : (evt.name + " ");
        if (evt.name != "" && !evt.isEventStart) {
          eventName += "(cont)";
        }
        jsonHour.events.push(eventName);
      });

      schedule.events[hepoch] = jsonHour;
    }

    // schedule = schedule.concat( [
    //   '=> 05:00pm (06-24) (now) ===== Training <=== ==== ============== Empire Ascend  ["New Rotation / Major Events may end"]  <=',
    //   "   06:00pm (06-24) (in 0:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   07:00pm (06-24) (in 1:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
    //   "   08:00pm (06-24) (in 2:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   09:00pm (06-24) (in 3:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   10:00pm (06-24) (in 4:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   11:00pm (06-24) (in 5:10) - Unknown ---------- Luna Gifts---- Research ----- [] -----------",
    //   "   12:00am (06-25) (in 6:10) - Unknown ---------- -------------- Research ----- [] -----------",
    //   "   01:00am (06-25) (in 7:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   02:00am (06-25) (in 8:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   03:00am (06-25) (in 9:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
    //   "   04:00am (06-25) (in 10:10)  Unknown ---------- -------------- Empire Ascend  [] -----------",
    //   "   05:00am (06-25) (in 11:10)  Unknown ---------- -------------- Research ----- [] -----------",
    //   "   06:00am (06-25) (in 12:10)  Unknown ---------- -------------- Research ----- [] -----------",
    // ]);
    return schedule;
  }
};


// var s = [
//
//   { hepoch: 10, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", [ "Training", "", "Empire Ascend", "New Rotation" ] },
//   { hepoch: 11, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", [ "Training", "Luna Gifts", "Empire Ascend" ] },
//
//   { hepoch: 10, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", events: { mini: "Training", fourHour: "Empire Ascend", other:"New Rotation" } },
//   { hepoch: 11, isCurrentHepoch: true, hepochReadable: "05:00pm (06-24)", secondsUntil: 12341234, timeUntilReadable: "now", events: { mini: "Training", luna:"Luna Gifts", fourHour: "Empire Ascend" } },
//
// ]


// '=> 05:00pm (06-24) (now) ===== Training <=== ==== ============== Empire Ascend  ["New Rotation / Major Events may end"]  <=',
// "   06:00pm (06-24) (in 0:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
// "   07:00pm (06-24) (in 1:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
// "   08:00pm (06-24) (in 2:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
// "   09:00pm (06-24) (in 3:10) - Unknown ---------- -------------- Research ----- [] -----------",
// "   10:00pm (06-24) (in 4:10) - Unknown ---------- -------------- Research ----- [] -----------",
// "   11:00pm (06-24) (in 5:10) - Unknown ---------- Luna Gifts---- Research ----- [] -----------",
// "   12:00am (06-25) (in 6:10) - Unknown ---------- -------------- Research ----- [] -----------",
// "   01:00am (06-25) (in 7:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
// "   02:00am (06-25) (in 8:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
// "   03:00am (06-25) (in 9:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
// "   04:00am (06-25) (in 10:10)  Unknown ---------- -------------- Empire Ascend  [] -----------",
// "   05:00am (06-25) (in 11:10)  Unknown ---------- -------------- Research ----- [] -----------",
// "   06:00am (06-25) (in 12:10)  Unknown ---------- -------------- Research ----- [] -----------",
