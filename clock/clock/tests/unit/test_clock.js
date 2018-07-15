'use strict';

const clock = require('../../clock.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests index', function () {
    it('verifies successful response', async () => {
        const schedule = new clock().generate_console();
        console.log(schedule);
        expect(schedule.length).to.equal(27);
    });
});
