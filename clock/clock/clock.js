var moment = require('moment-timezone');

module.exports = {
  generate_schedule: function () {
    var mnow = moment();
    console.log("in pst: " + mnow.tz("PST").format('hh:mm (MM-DD)'));
    console.log("in gmt: " + mnow.tz("GMT").format('hh:mm (MM-DD)'));
    console.log("in est: " + mnow.tz("EST").format('hh:mm (MM-DD)'));

    schedule = [
      "Current time is 05:49 (06-24)",
      "Next RVR in in 5:23:10",
      '=> 05:00pm (06-24) (now) ===== Training <=== ==== ============== Empire Ascend  ["New Rotation / Major Events may end"]  <=',
      "   06:00pm (06-24) (in 0:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
      "   07:00pm (06-24) (in 1:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
      "   08:00pm (06-24) (in 2:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
      "   09:00pm (06-24) (in 3:10) - Unknown ---------- -------------- Research ----- [] -----------",
      "   10:00pm (06-24) (in 4:10) - Unknown ---------- -------------- Research ----- [] -----------",
      "   11:00pm (06-24) (in 5:10) - Unknown ---------- Luna Gifts---- Research ----- [] -----------",
      "   12:00am (06-25) (in 6:10) - Unknown ---------- -------------- Research ----- [] -----------",
      "   01:00am (06-25) (in 7:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
      "   02:00am (06-25) (in 8:10) - Unknown ---------- -------------- Empire Ascend  [] -----------",
      "   03:00am (06-25) (in 9:10) - Unknown ---------- Luna Gifts---- Empire Ascend  [] -----------",
      "   04:00am (06-25) (in 10:10)  Unknown ---------- -------------- Empire Ascend  [] -----------",
      "   05:00am (06-25) (in 11:10)  Unknown ---------- -------------- Research ----- [] -----------",
      "   06:00am (06-25) (in 12:10)  Unknown ---------- -------------- Research ----- [] -----------",
    ]
    return schedule;
  },
};
