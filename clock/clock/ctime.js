module.exports = {
  create: function() {
    var utc_now = new Date().getTime();
    return {
      utc_now: utc_now,

      pst: function() {

      }
    }
  }
};
