'use strict';

const EventLoader = require('../../event_loader')

const assert = require('chai').assert;

describe('Event Loader v2', function () {

  it('finds all', async () => {
  	var json = {
      "50":["Monster Hunt"],
  	  "51":["Guild Quests"],

  	  "74":["Monster Hunt"],
  	  "75":["Guild Quests", "Monster Hunt"],

      "98":["Guild Quests"],
      "99":["Guild Quests"],

  	}
  	var loader = new EventLoader();
  	var result = loader._loadv2(json);

    var expected = {
      50: [ "Monster Hunt" ],
      51: [ "Guild Quests" ],
      74: [ "Monster Hunt" ],
      75: [ "Guild Quests", "Monster Hunt" ],
      98: [ "Guild Quests" ],
      99: [ "Guild Quests" ],
    }
    assert.deepEqual(expected, result);
  });

});


describe('Event Loader Evaluator', function () {

  it('finds all', async () => {
    var storedData = {
      50: [ "Monster Hunt" ],
      51: [ "Guild Quests" ],
      74: [ "Monster Hunt" ],
      75: [ "Guild Quests", "Monster Hunt" ],
      98: [ "Guild Quests" ],
      99: [ "Guild Quests" ],
    }
  	var evaluator = new EventLoader()._createEvaluator(storedData);

    assert.deepEqual(evaluator.getProjectionFor(50), { "Monster Hunt" : 1 });
    assert.deepEqual(evaluator.getProjectionFor(51), { "Guild Quests" : 1 });
    assert.deepEqual(evaluator.getProjectionFor(74), { "Monster Hunt" : 2 });
    assert.deepEqual(evaluator.getProjectionFor(75), { "Guild Quests" : 2, "Monster Hunt" : 1 });
    assert.deepEqual(evaluator.getProjectionFor(98), { "Guild Quests" : 1, "Monster Hunt" : 2 });
    assert.deepEqual(evaluator.getProjectionFor(99), { "Guild Quests" : 3, "Monster Hunt" : 1  });
  });

});
