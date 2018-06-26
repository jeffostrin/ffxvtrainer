var moment = require('moment')
var momentTZ = require('moment-timezone');

module.exports = {
  create: function() {
    var SECONDS_IN_HOUR = 60 * 60;

    var now = moment();
    var nowTZ = momentTZ();

    return {

      epochSeconds: function() {
        // for (var m in now) {
        //   console.log(m);
        // }
        return now.valueOf() / 1000;
      },

      epochHour: function() {
        return this.epochSeconds() / SECONDS_IN_HOUR;
      },

      pp: function() {
        var ONE_HOUR_AGO = -1 * 60 * 60;
        var SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

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
          asRelativeTime: function(relativeSeconds) {
            if (relativeSeconds <= ONE_HOUR_AGO) {
              return "past"
            }
            if (relativeSeconds <= 0) {
              return "now";
            }

            var days = this._humanifyDays(relativeSeconds);
            relativeSeconds = relativeSeconds % SECONDS_IN_DAY;

            var hours = this._humanifyHours(relativeSeconds);
            relativeSeconds = relativeSeconds % SECONDS_IN_HOUR;

            var minutes = this._humanifyMinutes(relativeSeconds)
            return "in " + days + hours + minutes
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

          _humanifyDays: function(timeInSeconds) {
            if (timeInSeconds < SECONDS_IN_DAY) {
              return "";
            }

            var days = Math.trunc(timeInSeconds / SECONDS_IN_DAY);
            return days + ":";
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
            return this._pad("00", minutes.toString(), true)
          }
        }
      }

    }
  }
};
