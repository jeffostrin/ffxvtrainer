module.exports = function TrainingCapacityCalculator() {
  var calculator = {}

  calculator.troopCapacity = function(capacity) {
    return {
      trainingTime(hours, minutes, seconds) {
        var tt = seconds + (minutes * 60) + (hours * 60 * 60);
        return {
          powerPerSecond() {
            var wmc = capacity * 2 / tt;
            var s = capacity * 3 / tt;
            return { wmc: wmc, s: s };
          }
        }
      }
    }
  }

  return calculator;
};
