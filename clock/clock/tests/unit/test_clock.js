'use strict';

const clock = require('../../clock.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests index', function () {
    it('verifies successful response', async () => {
        const schedule = clock.generate_schedule();
        console.log(schedule);
        expect(schedule.length).to.equal(16);
    });
});
