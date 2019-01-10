'use strict';

const Forecaster = require('../../forecaster')
const assert = require('chai').assert;

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

    assert.deepEqual(forecaster.forecastFor(50), { "Monster Hunt" : 1 });
    assert.deepEqual(forecaster.forecastFor(51), { "Guild Quests" : 1 });
    assert.deepEqual(forecaster.forecastFor(74), { "Monster Hunt" : 2 });
    assert.deepEqual(forecaster.forecastFor(75), { "Guild Quests" : 2, "Monster Hunt" : 1 });
    assert.deepEqual(forecaster.forecastFor(98), { "Guild Quests" : 1, "Monster Hunt" : 2 });
    assert.deepEqual(forecaster.forecastFor(99), { "Guild Quests" : 3, "Monster Hunt" : 1  });
  });

});
