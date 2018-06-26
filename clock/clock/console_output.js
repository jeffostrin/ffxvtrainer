
module.exports = {
  currentTime: function(ctime) {
    return "Current time is --- " + ctime.pp().gmt() + " --- " + ctime.pp().est() + " --- " + ctime.pp().pst()
  },
  nextRVR: function(ctime, nextRVR) {
    return "Next RVR " + ctime.pp().asRelativeTime(nextRVR);
  }

};
