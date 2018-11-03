'use strict';

const EventLoader = require('../../event_loader')

const chai = require('chai');
const expect = chai.expect;

describe('Event Loader', function () {

  it('load simple json', async () => {
  	var json = {
  	  "50":["Monster Hunt"],
  	  "51":["Guild Quests"],
  	}
  	var loader = new EventLoader();
  	var result = loader._load(json);
  	expect(result.length).to.equal(24);
  	expect(result[2]).to.equal("Monster Hunt");
  	expect(result[3]).to.equal("Guild Quests");
  });

  it('loads multiple values', async () => {
  	var json = {
  	  "50":["Monster Hunt"],
  	  "51":["Guild Quests"],

  	  "74":["Monster Hunt"],
  	  "75":["Guild Quests"],
  	}
  	var loader = new EventLoader();
  	var result = loader._load(json);
  	expect(result.length).to.equal(24);
  	expect(result[2]).to.equal("Monster Hunt");
  	expect(result[3]).to.equal("Guild Quests");
  });

  it('breaks a tie', async () => {
  	var json = {
  	  "50":["Monster Hunt"],
  	  "74":["Guild Quests"],
  	}
  	var loader = new EventLoader();
  	var result = loader._load(json);
  	expect(result.length).to.equal(24);
  	expect(result[2]).to.equal("Monster Hunt");
  });

  it('takes a higher value that comes later in time', async () => {
  	var json = {
  	  "50":["Monster Hunt"],
  	  "74":["Guild Quests"],
  	  "98":["Guild Quests"],
  	}
  	var loader = new EventLoader();
  	var result = loader._load(json);
  	expect(result.length).to.equal(24);
  	expect(result[2]).to.equal("Guild Quests");
  });
});