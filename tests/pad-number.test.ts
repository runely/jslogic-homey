import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import pad from '../lib/pad-number.js';

describe('Number', () => {
  test('higher than 10 is not padded', () => {
    assert.strictEqual(pad(12), '12');
  });

  test('10 is not padded', () => {
    assert.strictEqual(pad(10), '10');
  });

  test('lower than 10 is padded', () => {
    assert.strictEqual(pad(8), '08');
  });
});

describe('String number', () => {
  test('higher than 10 is not padded', () => {
    assert.strictEqual(pad('12'), '12');
  });

  test('10 is not padded', () => {
    assert.strictEqual(pad('10'), '10');
  });

  test('lower than 10 (one digit) is padded', () => {
    assert.strictEqual(pad('8'), '08');
  });

  test('lower than 10 (two digits) is not padded', () => {
    assert.strictEqual(pad('08'), '08');
  });
});
