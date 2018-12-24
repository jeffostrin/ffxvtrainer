'use strict'

const fact = require('../fact');

module.exports = function TrainingPlanner() {
  var instance = {};


  instance.findNextEvent = function() {
    return {
      in(upcoming) {
        var trainingEvents = upcoming.findEvents((evt) => evt.name == "Training");
        new fact().value(trainingEvents).is().notNull();
        if (trainingEvents.length == 0) {
          return null;
        }
        return trainingEvents[0];
      }
    };
  }

  return instance;
};
