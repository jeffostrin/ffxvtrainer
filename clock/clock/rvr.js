'use strict'

module.exports = class RVR {
  constructor() {
    var SECONDS_IN_DAY = 60 * 60 * 24;
    this.rvr = {
      epoch: 1527984000,
      interval: 7 * SECONDS_IN_DAY,
      duration: SECONDS_IN_DAY
    }
  }

  calculate_next(currentEpoch) {
    //console.log("currentEpoch:" + currentEpoch)
    var nextRVR = this.rvr.interval - ( (currentEpoch - this.rvr.epoch) % this.rvr.interval)
    return nextRVR;
  }
};
