'use strict'

var ctime = require('./ctime').create();
var EventRotation = require('./event_rotation')

module.exports = {
  generate_schedule: function () {

    var lunaRotation = new EventRotation(
      0,
      [ { name: "", duration: 2 },
        { name: "Luna Gifts", duration: 1 },
        { name: "", duration: 1 },
      ]);

    var fourHourEventRotation = new EventRotation(
      0,
      [ { name: "Empire Ascend", duration: 4 },
        { name: "Research", duration: 4, },
      ]);

    //
    //   console.log("100: " + lunaRotation.lookup(100));
    //   console.log("101: " + lunaRotation.lookup(101));
    //   console.log("102: " + lunaRotation.lookup(102));
    //   console.log("103: " + lunaRotation.lookup(103));
    //   console.log("104: " + lunaRotation.lookup(104));
    //   console.log("105: " + lunaRotation.lookup(105));
    //   console.log("106: " + lunaRotation.lookup(106));
    //
    //
    //   console.log("99: " + fourHourEventRotation.lookup(99));
    // console.log("100: " + fourHourEventRotation.lookup(100));
    // console.log("101: " + fourHourEventRotation.lookup(101));
    // console.log("102: " + fourHourEventRotation.lookup(102));
    // console.log("103: " + fourHourEventRotation.lookup(103));
    // console.log("104: " + fourHourEventRotation.lookup(104));
    // console.log("105: " + fourHourEventRotation.lookup(105));
    // console.log("106: " + fourHourEventRotation.lookup(106));
    //
    var schedule = [
      "Current time is " + ctime.gmt(),
      "Current time is " + ctime.est(),
      "Current time is " + ctime.pst(),
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
