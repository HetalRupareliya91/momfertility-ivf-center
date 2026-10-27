const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isEmail, isPhone, isNonEmpty, isFutureDate, clean } = require('../src/utils/validators');

test('isEmail', () => {
  assert.equal(isEmail('care@momfertility.in'), true);
  assert.equal(isEmail('not-an-email'), false);
});

test('isPhone', () => {
  assert.equal(isPhone('+91 98765 43210'), true);
  assert.equal(isPhone('12345'), false);
});

test('isNonEmpty', () => {
  assert.equal(isNonEmpty('  hi  ', 2), true);
  assert.equal(isNonEmpty('   '), false);
});

test('isFutureDate', () => {
  assert.equal(isFutureDate('2000-01-01'), false);
  assert.equal(isFutureDate('2999-12-31'), true);
  assert.equal(isFutureDate('31-12-2999'), false);
});

test('clean strips angle brackets', () => {
  assert.equal(clean('  <b>Hello</b> '), 'bHello/b');
});
