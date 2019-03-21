const Forecaster = require('./forecaster')
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

  loader._load = function(json) {
  	//console.log(json);
  	var byHour = read_all_hours(json);
  	//console.log(byHour);
  	return byHour;
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

  loader.load = function(fileName) {
    var filePath = getPath(fileName)
  	//console.log(filePath);
  	var json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    var hourlyEvents = loader._load(json);
    return new Forecaster().create(hourlyEvents);
  }

  return loader;
}
