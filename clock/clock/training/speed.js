'use strict'

const fact = require('../fact');

module.exports = function TrainingSpeed(powerPerSecond) {
  var instance = {};

  instance.Create = function(trainingQueueSize, t1WarriorSeconds, t1MageSeconds, t1CalvarySeconds, t1SeigeSeconds) {
    return {
      maxUnits: trainingQueueSize,
      t1WarriorSeconds: t1WarriorSeconds,
      t1MageSeconds: t1MageSeconds,
      t1CalvarySeconds: t1CalvarySeconds,
      t1SeigeSeconds: t1SeigeSeconds,
    }
  }

  return instance;
};
