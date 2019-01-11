'use strict';

const Forecaster = require('../../forecaster')
const assert = require('chai').assert;

var EventList = function() {
  var lastHepoch = 0;
  var listObject = {};
  listObject.list = {};

  listObject.atHepoch = function(hepoch) {
    lastHepoch = hepoch;
    return {
      addEvent: function(evt) {
        listObject.list[lastHepoch] = [ evt ];
        return listObject;
      }
    };
  }

  listObject.rewind = function(hourCount) {
    lastHepoch = lastHepoch - hourCount;
    return {
      addEvent: function(evt) {
        listObject.list[lastHepoch] = [ evt ];
        return listObject;
      }
    };
  }

  listObject.build = function() {
    return listObject.list;
  }

  return listObject;
};

function scores(dayArray) {
  var score = 0;
  for (var i = 0; i < dayArray.length; i++) {
    if (dayArray[i] == 1) {
      score = score + (50 / Math.pow(2, i))
    }
  }
  return score;
}

describe('Forecast an hepoch', function () {

  it('finds all', async () => {
    var hourlyEvents = {
      50: [ "Monster Hunt" ],
      51: [ "Guild Quests" ],
      74: [ "Monster Hunt" ],
      75: [ "Guild Quests", "Monster Hunt" ],
      98: [ "Guild Quests" ],
      99: [ "Guild Quests" ],
    }
  	var forecaster = new Forecaster().create(hourlyEvents);

    assert.deepEqual(forecaster.forecastFor(50), { "Monster Hunt" : scores([1]) });
    assert.deepEqual(forecaster.forecastFor(74), { "Monster Hunt" : scores([1,1]) });
    assert.deepEqual(forecaster.forecastFor(98), { "Guild Quests" : scores([1,0,0]), "Monster Hunt" : scores([0,1,1]) });

    assert.deepEqual(forecaster.forecastFor(51), { "Guild Quests" : scores([1]) });
    assert.deepEqual(forecaster.forecastFor(75), { "Guild Quests" : scores([1,1]), "Monster Hunt" : scores([1,0]) });
    assert.deepEqual(forecaster.forecastFor(99), { "Guild Quests" : scores([1,1,1]), "Monster Hunt" : scores([0,1,0])  });
  });

  it('scores with builder', async() => {
    var hourlyEvents = new EventList()
      .atHepoch(500).addEvent("Monster")
      .rewind(24).addEvent("Monster")
      .build();

    var forecaster = new Forecaster().create(hourlyEvents);
    assert.deepEqual(forecaster.forecastFor(500), { "Monster" : scores([1,1]) });
  });

  it('scores with decay', async() => {
    var hourlyEvents = new EventList()
      .atHepoch(500).addEvent("Monster")
      .rewind(24).addEvent("Monster")
      .rewind(24).addEvent("Monster")
      .rewind(24).addEvent("Monster")
      .build();

    var forecaster = new Forecaster().create(hourlyEvents);
    assert.deepEqual(forecaster.forecastFor(500), { "Monster" : scores([1,1,1,1]) });
  });

  // it('explore exp', async () => {
  //   console.log(1 / Math.pow(2, 0));
  //   console.log(1 / Math.pow(2, 1));
  //   console.log(1 / Math.pow(2, 2));
  //   console.log(1 / Math.pow(2, 3));
  //   console.log(1 / Math.pow(2, 4));
  // });

});
