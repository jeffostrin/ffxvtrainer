'use strict'

module.exports = function fact() {
  var fact = {};

  fact.value = function(val) {
    return {
      is() {
        return {

          notNull: function() {
            // console.log(val);
            //console.log(val);
            if (val == null) {
              throw "value should not be null";
            }
          },

          anArray: function() {
            if (!Array.isArray(val)) {
              throw "value should be an array";
            }
          },

        };
      }
    }
  }

  return fact;
};
