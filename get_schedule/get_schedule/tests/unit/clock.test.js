'use strict';

const clock = require('../../clock.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests /clock/', function () {
    it('verifies successful response', async () => {
        const schedule = new clock().generate_v2_json();
        //console.log(schedule);
    });
});
