module.exports = function Schedule() {

  create = function(startHepoch, endHepoch) {
    var schedule = {};
    schedule.startHepoch = startHepoch;
    schedule.endHepoch = endHepoch;
    schedule.eventRotations = null;

    schedule.addRotations = function(eventRotations) {
      if (schedule.eventRotations != null) {
        throw "You can only addRotations() once";
      }
      schedule.eventRotations = eventRotations;
    }

    schedule.eventsForHepoch = function(hepoch) {
      hourEvents = []
      schedule.eventRotations.forEach((rotation, index) => {
        var evt = rotation.lookupEvent(hepoch);
        hourEvents.push({
          name: evt.name,
          isEventStart: (evt.startHepoch == hepoch),
          startHepoch: evt.startHepoch,
        });
      });
      return hourEvents;
    }

    //console.log(schedule);
    return schedule;
  }


  this.fromHepoch = function(startHepoch) {
    return {
      toHepoch(endHepoch) {
        return create(startHepoch, endHepoch);
      }
    }
  }
};
