'use strict';

const clock = require('../../clock.js');
const chai = require('chai');
const expect = chai.expect;
var event, context;


describe('Tests /clock/', function () {
    it('verifies successful response', async () => {
        const schedule = new clock().generate_console();
        console.log(schedule);
        expect(schedule.length).to.greaterThan(20);
        //console.log(new clock().generate_json());
    });
    it('verifies successful response', async () => {
        const schedule = new clock().generate_json();
        //console.log(schedule);
        //expect(schedule.length).to.equal(27);
        //console.log(new clock().generate_json());
        //expect("Gather RSS").to.equal("Gather RSS <===")
    });
});
