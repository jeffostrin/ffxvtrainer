'use strict'

module.exports = function TimeConstants() {
  var constants = {};
  constants.SECONDS_IN_MINUTE = 60;
  constants.SECONDS_IN_HOUR = constants.SECONDS_IN_MINUTE * 60;
  constants.SECONDS_IN_DAY = constants.SECONDS_IN_HOUR * 24;
  constants.SECONDS_IN_WEEK = constants.SECONDS_IN_DAY * 7;
  return constants;
};
