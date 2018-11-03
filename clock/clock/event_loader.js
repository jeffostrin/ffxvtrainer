'use strict'
const fs = require('fs');
const path = require('path');

//const fact = require('./fact');

module.exports = function EventLoader() {
  var loader = {};

  function combine_by_hour(json) {
  	var result = [24];
  	for (var i = 0; i <24; i++) {
  		result[i] = [];
  	}
  	Object.keys(json).forEach(function(key) {
  	  var hepoch = parseInt(key, 10);
  	  var hour = (parseInt(key, 10) % 24);
   	  var eventsForHour = result[hour];
  	  json[key].forEach(function(val) {
  	  	eventsForHour.push(val);
   	  })
  	});

  	return result;
  }

  function pick_most_common_in_hour(events) {
  	var counts = {};
  	var mostCommon = "";
  	var mostCommonCount = 0;
  	events.forEach(function(event) {
      if (counts[event] == null) {
      	counts[event] = 1;
      } else {
      	var count = counts[event];
      	count = count + 1;
      	counts[event] = count;

      	if (count > mostCommonCount) {
      		mostCommon = event;
      		mostCommonCount = count;
      	}
      }
  	});
  	return mostCommon;
  }

  function pick_most_common(byHour) {
  	var result = [];
  	for (var i = 0; i < 24; i++) {
  		result[i] = pick_most_common_in_hour(byHour[i]);
  	}
  	return result;
  }

  loader.load = function() {
  	var filePath = path.join(__dirname, "..", "..", "mini_events.json")
  	//console.log(filePath);
  	var json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  	//console.log(json);
  	var byHour = combine_by_hour(json);
  	//console.log(byHour);
  	var mostCommon = pick_most_common(byHour);
  	//console.log(mostCommon);
  	return mostCommon;
  }

  return loader;
}
