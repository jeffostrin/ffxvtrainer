'use strict';

const EventLoader = require('../../event_loader')

const assert = require('chai').assert;

describe('Event Loader', function () {

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
  	var result = loader._load(json);

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
