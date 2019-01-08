'use strict';

module.exports = function RotationBuilder() {
  var builder = {}
  builder.events = {};

  builder.addEvent = function(hepoch, name) {
    builder.events[hepoch] = name;
    return this;
  }

  builder.build = function() {
    var keys = Object.keys(builder.events);
    keys = keys.sort(function(x,y) { return x < y; });

    var list = [];
    keys.forEach((hepoch, index) => {
      var event = builder.events[hepoch];
      var duration = 1;

      list.push({ utc: hepoch, name: event, duration: duration });
    });
    list = list.sort(function(x,y) { return x.utc - y.utc; });
    console.log()
    return list;
  }

  return builder;
};
