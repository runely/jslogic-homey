import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import getTime from '../lib/get-time.js';
import luxonDateTime from '../lib/luxon-datetime.js';

const now = luxonDateTime({});

describe('Date with', () => {
  test('valid format HH:mm -> Returns luxonDateTime', () => {
    const time = getTime('08:30');
    assert.strictEqual(time.day, now.day);
    assert.strictEqual(time.month, now.month);
    assert.strictEqual(time.year, now.year);
    assert.strictEqual(time.hour, 8);
    assert.strictEqual(time.minute, 30);
  });

  test('valid format HH.mm -> Returns luxonDateTime', () => {
    const time = getTime('08.30');
    assert.strictEqual(time.day, now.day);
    assert.strictEqual(time.month, now.month);
    assert.strictEqual(time.year, now.year);
    assert.strictEqual(time.hour, 8);
    assert.strictEqual(time.minute, 30);
  });
});
