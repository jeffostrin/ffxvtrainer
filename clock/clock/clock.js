'use strict'

const CTime = require('./ctime');
var EventRotation = require('./event_rotation')
var RVR = require('./rvr')
var consoleView = require('./console_output')
const Schedule = require('./schedule');
const GatherHelper = require('./gather_helper')
const TrainingCapacityCalculator = require ('./training_capacity_calculator')
const TrainingHelper = require('./training_helper')
const EventLoader = require('./event_loader')
const TrainingSpeed = require('./training/speed')
const TrainingPlanner = require('./training/planner')

var GatherRSS = "Gather RSS"
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

  // Event loader returns events based on UTC 0 in the first slot
  // This is important for clock alignment
  var eventLoader = new EventLoader();
  var events = eventLoader.load();
  var miniRotation = [];
  for (var i = 0; i < events.length; i++) {
    miniRotation[i] = { name: events[i], duration: 1 };
  }

  var miniEventRotation = new EventRotation(
    0,
    miniRotation
  );

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
  clock.sch.addRotations([ miniEventRotation, lunaRotation ]); //, fourHourEventRotation ])

  var rvr = new RVR();
  clock.nextRVR = rvr.calculate_next(clock.ctime.epochSeconds());

  this.generate_console = function () {
    var json = this.generate_json();
    var output = [];

    //console.log(json);
    output.push(json["currentTime"]);
    output.push(json["nextRVR"]);
    output.push(json["nowHints"]);

    var keys = Object.keys(json["events"]).sort().forEach((hepoch, index) => {
      var hourInfo = json["events"][hepoch];

      var consoleHour = "   ";
      var padding = "-";
      if (hourInfo.isCurrentHepoch) {
        consoleHour = "=> ";
        padding = "=";
      }

      var timestamp = clock.ctime.pp().dayTime(hepoch) + " (" + clock.ctime.pp().asRelativeTime(hepoch * 60 * 60 - clock.nowSepoch) + ") "
      consoleHour += timestamp.padEnd(31, padding) + " ";

      var hourEvents = hourInfo["events"];
      //console.log(hourEvents);
      hourEvents.forEach((evt, index) => {
        consoleHour += evt.padEnd(20, padding) + " ";
      });

      if (hourInfo.isCurrentHepoch) {
        consoleHour += " <=";
      }

      output.push(consoleHour);

    });

    return output;
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

    schedule.nowHints = [];


    var gatherParams = { loadTime: 8903, loadCapacity: 109060 };
    var gatherHelper = new GatherHelper();
    var gatherEvents = gatherHelper.findEvents().in(clock.sch);
    //console.log(gatherEvents.length);
    var gatherHints = gatherEvents.forEach((evt, index) => {
      var secondsUntilEvent = clock.ctime.secondsUntilHepoch(evt.startHepoch);
      var hint = gatherHelper.createHint().for(gatherParams).eventStartsIn(secondsUntilEvent).seconds();
      //console.log(hint);
      if (hint != null) {
        schedule.nowHints.push(hint);
      }
    });

    var trainingSpeed = new TrainingSpeed().Parse("1000", "1d 00:00:00", "1d 00:00:00", "1d 00:00:00", "1d 00:00:00")
    var nextTraining = new TrainingPlanner().findNextEvent().in(clock.sch);

    // var trainingParams = { maxUnits: 4400, t1WarriorSeconds: 15385 };
    // var trainingPowerPerSecond = new TrainingCapacityCalculator().troopCapacity(17145).trainingTime(16, 40, 7.5).powerPerSecond();
    // var trainingHelper = new TrainingHelper(trainingPowerPerSecond);
    // var nextTraining = trainingHelper.findNextEvent().in(clock.sch);
    // console.log(nextTraining);
    // if (nextTraining != null) {
    //   var secondsUntilEvent = clock.ctime.secondsUntilHepoch(nextTraining.startHepoch);
    //   var options = trainingHelper.calculateOptionsFor(secondsUntilEvent);
    //   console.log(options);
    //   // var hint = trainingHelper.createHint().for(trainingParams).in(secondsUntilEvent).seconds();
    //   // console.log(hint);
    //   // schedule.nowHints.push(hint);
    // }
    //var gatherHint = new GatherHelper().createHint().for(schedule).in(10).seconds();

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
