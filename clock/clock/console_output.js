
module.exports = {
  currentTime: function(ctime) {
    return "Current time is --- " + ctime.pp().gmt() + " --- " + ctime.pp().est() + " --- " + ctime.pp().pst()
  },
  nextRVR: function(ctime, nextRVR) {
    return "Next Major RVR " + ctime.pp().asRelativeTime(nextRVR);
  },
  showSchedule: function(schedule) {
    return [
      "line 1",
      "line 2",
      "line 3"
    ];
  }
};
