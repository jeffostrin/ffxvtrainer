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
  	  //console.log(key);
  	  var hepoch = parseInt(key, 10);
  	  var hour = (parseInt(key, 10) % 24);
   	  var eventsForHour = result[hour];
  	  json[key].forEach(function(val) {
  	  	eventsForHour.push(val);
   	  })
  	});

  	return result;
  }

  // https://coderwall.com/p/nilaba/simple-pure-javascript-array-unique-method-with-5-lines-of-code
  // does not work with objects and mixed value arrays
  Array.prototype.unique = function() {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  function read_all_hours(json) {
  	var result = [24];
  	for (var i = 0; i <24; i++) {
  		result[i] = [];
  	}
  	Object.keys(json).forEach(function(key) {
  	  //console.log(key);
  	  var hepoch = parseInt(key, 10);
  	  var hour = (parseInt(key, 10) % 24);
   	  var eventsForHour = result[hour];
  	  json[key].forEach(function(val) {
  	  	eventsForHour.push(val);
        result[hour] = eventsForHour.unique();
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
      	counts[event] = 0;
      }

      var count = counts[event];
      count = count + 1;
      counts[event] = count;

      if (count > mostCommonCount) {
        mostCommon = event;
        mostCommonCount = count;
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

  loader._load = function(json) {
  	//console.log(json);
  	var byHour = combine_by_hour(json);
  	//console.log(byHour);
  	var mostCommon = pick_most_common(byHour);
  	//console.log(mostCommon);
  	return mostCommon;
  }

  loader._loadv2 = function(json) {
  	//console.log(json);
  	var byHour = read_all_hours(json);
  	//console.log(byHour);
  	return byHour;
  }

  loader.load = function() {
  	var filePath = path.join(__dirname, "..", "..", "mini_events.json")
  	//console.log(filePath);
  	var json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  	return loader._load(json);
  }

  loader.loadv2 = function() {
    var filePath = path.join(__dirname, "..", "..", "mini_events.json")
  	//console.log(filePath);
  	var json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  	return loader._loadv2(json);
  }

  return loader;
}
