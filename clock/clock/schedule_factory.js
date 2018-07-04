'use strict'

module.exports = class ScheduleFactory {
  constructor() {
  }

  at(ctime) {
    return {
      forHepochs(startHepoch, lastHepoch) {
        return {
          forEventRotations(eventRotations) {
            var eventSchedules = {}
            for (var rotation in eventRotations) {
              eventSchedules[rotation] = eventRotations[rotation].createSchedule2(startHepoch, lastHepoch);
            }

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
                  var events = {}
                  for (var schedule in eventSchedules) {
                    //console.log(eventSchedules[schedule]);
                    console.log(eventSchedules[schedule][hepochIndex]);
                    events[schedule] = eventSchedules[schedule][hepochIndex].name;
                  }
                  var hourlySchedule = {
                    hepoch: hepoch,
                    hepochReadable: ctime.pp().dayTime(hepoch),
                    isCurrentHepoch: (ctime.epochHour() == hepoch),
                    secondsUntil: secondsUntilHepoch,
                    timeUntil: ctime.pp().asRelativeTime(secondsUntilHepoch),
                    events: events
                  };
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
