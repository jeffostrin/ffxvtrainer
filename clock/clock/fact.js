'use strict'

module.exports = function fact() {
  var fact = {};

  fact.value = function(val) {
    return {
      is() {
        return {
          notNull() {
            // console.log(val);
            //console.log(val);
            if (val == null) {
              throw "value should not be null";
            }
          }
        }
      }
    }
  }

  return fact;
};
