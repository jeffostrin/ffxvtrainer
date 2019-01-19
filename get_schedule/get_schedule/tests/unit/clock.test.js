'use strict';

const clock = require('../../clock.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests /clock/', function () {
    it('verifies successful response', async () => {
        const schedule = new clock(-8).generate_json();
        //console.log(schedule);
    });
});
