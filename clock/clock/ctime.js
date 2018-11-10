'use strict'

var moment = require('moment')
var momentTZ = require('moment-timezone');

module.exports = class CTime {
  constructor() {
    this.SECONDS_IN_HOUR = 60 * 60;

    this.now = moment();
    this.nowTZ = momentTZ();
  }

  epochSeconds() {
    // for (var m in now) {
    //   console.log(m);
    // }
    return this.now.valueOf() / 1000;
  }

  epochHour() {
    return Math.trunc(this.epochSeconds() / this.SECONDS_IN_HOUR);
  }

  secondsUntilHepoch(hepoch) {
    //console.log("hepoch:" + hepoch + " epochHour():" + this.epochHour());
    return (hepoch - this.epochHour()) * this.SECONDS_IN_HOUR;
  }

  setSepoch(sepoch) {
    // for (var m in this.now) {
    //   console.log(m);
    // }
    // this.now.valueOf(sepoch);
    this.now = moment(sepoch * 1000);
    this.nowTZ = momentTZ(sepoch * 1000);
  }

  pp() {
    var ONE_HOUR_AGO = -1 * 60 * 60;
    var SECONDS_IN_MINUTE = 60;
    var SECONDS_IN_HOUR = 60 * 60;
    var SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
    var nowTZ = this.nowTZ;

    return {
      pst: function() {
        return nowTZ.tz("America/Los_Angeles").format('hh:mma (MM-DD)') + " PST";
      },
      est: function() {
        return nowTZ.tz("America/New_York").format('hh:mma (MM-DD)') + " EST";
      },
      gmt: function() {
        return nowTZ.tz("GMT").format('HH:mm (MM-DD)') + " GMT";
      },
      dayTime: function(hepoch) {
        return momentTZ(hepoch * SECONDS_IN_HOUR * 1000).tz("America/Los_Angeles").format('hh:mma (MM-DD)');
      },
      asRelativeTime: function(relativeSeconds) {
        if (relativeSeconds <= ONE_HOUR_AGO) {
          return "past"
        }
        if (relativeSeconds <= 0) {
          return "now";
        }
        var futureTime = this.asFutureTime(relativeSeconds);
        return "in " + futureTime
      },
      asFutureTime: function(relativeSeconds) {
        var days = this._humanifyDays(relativeSeconds);
        relativeSeconds = relativeSeconds % SECONDS_IN_DAY;

        var hours = this._humanifyHours(relativeSeconds);
        relativeSeconds = relativeSeconds % SECONDS_IN_HOUR;

        var minutes = this._humanifyMinutes(relativeSeconds)
        relativeSeconds = relativeSeconds % SECONDS_IN_MINUTE;

        var seconds = this._humanifySeconds(relativeSeconds);
        return days + hours + minutes + seconds;
      },

      // https://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
      _pad: function(pad, str, padLeft) {
        if (typeof str === 'undefined')
          return pad;
        if (padLeft) {
          return (pad + str).slice(-pad.length);
        } else {
          return (str + pad).substring(0, pad.length);
        }
      },
      _lpad: function(pad, str) {
        return (pad + str).slice(-pad.length);
      },
      _rpad: function(pad, str) {
        return (str + pad).substring(0, pad.length);
      },

      _humanifyDays: function(timeInSeconds) {
        if (timeInSeconds < SECONDS_IN_DAY) {
          return "";
        }

        var days = Math.trunc(timeInSeconds / SECONDS_IN_DAY);
        return days + "d ";
      },

      _humanifyHours: function(timeInSeconds) {
        if (timeInSeconds < SECONDS_IN_HOUR) {
          return "0:";
        }

        var hours = Math.trunc(timeInSeconds / SECONDS_IN_HOUR);
        return hours + ":";
      },

      _humanifyMinutes: function(timeInSeconds) {
        var minutes = Math.trunc(timeInSeconds / 60);
        return this._lpad("00", minutes.toString()) + ":";
      },

      _humanifySeconds: function(timeInSeconds) {
        var minutes = Math.trunc(timeInSeconds);
        return this._lpad("00", minutes.toString())
      }
    }
  }

};
