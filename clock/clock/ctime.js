var moment = require('moment-timezone');


module.exports = {
  create: function() {

    var now = moment();

    return {
      pst: function() {
        return now.tz("America/Los_Angeles").format('hh:mm (MM-DD)') + " PST";
      },
      est: function() {
        return now.tz("America/New_York").format('hh:mm (MM-DD)') + " EST";
      },
      gmt: function() {
        return now.tz("GMT").format('hh:mm (MM-DD)') + " GMT";
      }
    }
  }
};
