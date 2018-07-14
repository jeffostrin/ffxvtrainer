'use strict'
var Schedule = require('./schedule.js')

module.exports = class ScheduleFactory {
  constructor() {
  }

  at(ctime) {
    return {
      forHepochs(startHepoch, lastHepoch) {
        return {

          forRotations(eventRotations) {
            return {
              create() {
                var schedule = new Schedule();
                var evt = {};
                schedule.add(evt).atHepoch(5).through(10);
                return schedule;
              }
            }
          },


          forEventRotations(eventRotations) {
            var eventSchedules = {}

            for (var rotation in eventRotations) {
              console.log(rotation);
              eventSchedules[rotation] = eventRotations[rotation].createSchedule2(startHepoch, lastHepoch);
            }

console.log(eventSchedules);
            return {
              create() {
                // console.log("startHepoch:" + startHepoch + " lastHepoch:" + lastHepoch + " eventRotations:" + eventRotations);
                var result = [];
                for (var hepoch = startHepoch; hepoch <= lastHepoch; hepoch++) {
                  var hepochIndex = hepoch - startHepoch;
                  var secondsUntilHepoch = ctime.secondsUntilHepoch(hepoch);
                  // for (var rotation in eventRotations) {
                  //   console.log(eventRotations[rotation]);
                  // }
                  // console.log("building...");
                  var events = {}
                  console.log("creating hepoch "+ hepoch)
                  for (var schedule in eventSchedules) {
                    var evt = eventSchedules[schedule][hepochIndex]; //<== we want hepoch, not the index
                    console.log(evt);
                    if (evt != null) {
                      //console.log(eventSchedules[schedule]);
                      // console.log(schedule + ":" + eventSchedules[schedule][hepochIndex]);
                      // console.log(eventSchedules[schedule][hepochIndex]);
                      events[schedule] = evt.name;

                      console.log(evt.startHepoch + " compare to " + hepoch + " for " + schedule + " >> " + evt.name);

                      //console.log(eventSchedules[schedule][hepochIndex].startHepoch + " <> " + hepoch);
                      if (evt.startHepoch != hepoch) {
                        //console.log(eventSchedules[schedule][hepochIndex].startHepoch + " <> " + hepoch + " appending " + schedule);
                        events[schedule] = events[schedule] + " (cont)";
                      }
                    // } else {
                    //   console.log("found null");
                    }
                  }
                  var hourlySchedule = {
                    hepoch: hepoch,
                    hepochReadable: ctime.pp().dayTime(hepoch),
                    isCurrentHepoch: (ctime.epochHour() == hepoch),
                    secondsUntil: secondsUntilHepoch,
                    timeUntil: ctime.pp().asRelativeTime(secondsUntilHepoch),
                    events: events
                  };
                  console.log(hourlySchedule);
                  result.push(hourlySchedule);
                }
                return result;
              }
            };
          }
        };
      }
    };
  }
};
