const fs = require('fs');
const path = require('path');

//const fact = require('./fact');

module.exports = function EventLoader() {
  var loader = {};

  function read_all_hours(json) {
    var mostRecentHepoch = 0;
    Object.keys(json).forEach(function(key) {
  	  var hepoch = parseInt(key, 10);
      if (mostRecentHepoch < hepoch) {
        mostRecentHepoch = hepoch;
      }
    });

    var maxResultSize = 24 * 100; // 100 days of data
    var result = {};
  	Object.keys(json).forEach(function(key) {
  	  //console.log(key);
  	  var hepoch = parseInt(key, 10);
  	  var hourIndex = maxResultSize - (mostRecentHepoch - hepoch) - 1;

      if (hourIndex >= 0) {
        result[hepoch] = json[key];
      }
  	});

  	return result;
  }

  loader._loadv2 = function(json) {
  	//console.log(json);
  	var byHour = read_all_hours(json);
  	//console.log(byHour);
  	return byHour;
  }

  loader._createEvaluator = function(hourlyEvents) {
    return {
      getProjectionFor(hepoch) {
        var result = {};
        for (var day = 0; day < 100; day++) {
          var targetHepoch = hepoch - (day * 24);
          if (hourlyEvents[targetHepoch] == null) {
            continue;
          }
          // console.log("for " + hepoch + " inspecting " + targetHepoch);
          // console.log(result);
          var events = hourlyEvents[targetHepoch];
          events.forEach(function(evt) {
            if (result[evt] == null) {
              result[evt] = 0;
            }
            result[evt] = result[evt] + 1;
          });
        }

        return result;
      }
    };
  }

  // https://stackoverflow.com/questions/17699599/node-js-check-exist-file
  function checkFileExistsSync(filepath){
    let flag = true;
    try{
      fs.accessSync(filepath, fs.F_OK);
    }catch(e){
      flag = false;
    }
    return flag;
  }

  function getPath(fname) {
    var awsPath = path.join("/var/task/", fname);
    if (checkFileExistsSync(awsPath)) {
      return awsPath;
    }
    var localPath = path.join(__dirname, "..", "..", fname)
    return localPath;
  }

  loader.loadv2 = function() {
    var filePath = getPath("mini_events.json")
  	//console.log(filePath);
  	var json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    var hourlyEvents = loader._loadv2(json);
    return loader._createEvaluator(hourlyEvents);
  }

  return loader;
}
