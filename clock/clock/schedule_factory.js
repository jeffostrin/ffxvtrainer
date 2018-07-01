'use strict'

module.exports = class ScheduleFactory {
  constructor() {
  }

  at(ctime) {
    return {
      forHepochs(startHepoch, lastHepoch) {
        return {
          forEventRotations(eventRotations) {
            return {
              create() {
                // console.log("startHepoch:" + startHepoch + " lastHepoch:" + lastHepoch + " eventRotations:" + eventRotations);
                var result = [];
                for (var hepoch = startHepoch; hepoch <= lastHepoch; hepoch++) {
                  var secondsUntilHepoch = ctime.secondsUntilHepoch(hepoch);
                  var hourlySchedule = {
                    hepoch: hepoch,
                    hepochReadable: ctime.pp().dayTime(hepoch),
                    isCurrentHepoch: (ctime.epochHour() == hepoch),
                    secondsUntil: secondsUntilHepoch,
                    timeUntil: ctime.pp().asRelativeTime(secondsUntilHepoch)
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
