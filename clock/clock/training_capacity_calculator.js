module.exports = function TrainingCapacityCalculator() {
  var calculator = {}

  calculator.troopCapacity = function(capacity) {
    return {
      trainingTime(hours, minutes, seconds) {
        calculator._trainingTime = seconds + (minutes * 60) + (hours * 60 * 60);
        return {
          powerPerSecond() {
            var wmc = capacity * 2 / calculator._trainingTime;
            var s = capacity * 3 / calculator._trainingTime;
            var pps = {
              wmc: wmc, 
              s: s,
              trainingTime: calculator._trainingTime
            };
            pps.getTrainingTimeInSeconds = function() {
              return calculator._trainingTime;
            }
            return pps;
          }
        }
      }
    }
  }

  return calculator;
};
