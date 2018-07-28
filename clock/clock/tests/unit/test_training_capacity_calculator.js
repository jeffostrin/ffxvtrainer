'use strict';

const Calculator = require('../../training_capacity_calculator');
const chai = require('chai');
const expect = chai.expect;

function assertCapacity(actual, expected) {
  expect(expected.wmc).to.equal(actual.wmc);
  expect(expected.s).to.equal(actual.s);
}

describe('Training Capacity Calculator', function () {
  it('Calculates Power Per Second', async () => {
    var calculator = new Calculator();
    assertCapacity(
      calculator.troopCapacity(4400).trainingTime(4, 16, 25).powerPerSecond(),
      { wmc: 0.5719857003574911, s: 0.8579785505362366 });
    assertCapacity(
      calculator.troopCapacity(17145).trainingTime(16, 40, 7.5).powerPerSecond(),
      { wmc: 0.5714285714285714, s: 0.8571428571428571 });
    assertCapacity(
      calculator.troopCapacity(8205).trainingTime(6, 3, 48).powerPerSecond(),
      { wmc: 0.7517866959868059, s: 1.1276800439802088 });
  });

});
