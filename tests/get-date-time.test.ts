import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import getDateTime from '../lib/get-date-time.js';

describe('DateTime with', () => {
  test('valid format dd.MM.yyyy HH:mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01.12.2021 08:30');
    assert.strictEqual(dateTime.day, 1);
    assert.strictEqual(dateTime.month, 12);
    assert.strictEqual(dateTime.year, 2021);
    assert.strictEqual(dateTime.hour, 8);
    assert.strictEqual(dateTime.minute, 30);
  });

  test('valid format dd/MM/yyyy HH.mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01/12/2021 08.30');
    assert.strictEqual(dateTime.day, 1);
    assert.strictEqual(dateTime.month, 12);
    assert.strictEqual(dateTime.year, 2021);
    assert.strictEqual(dateTime.hour, 8);
    assert.strictEqual(dateTime.minute, 30);
  });

  test('valid format dd-MM-yyyy HH:mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01-12-2021 08:30');
    assert.strictEqual(dateTime.day, 1);
    assert.strictEqual(dateTime.month, 12);
    assert.strictEqual(dateTime.year, 2021);
    assert.strictEqual(dateTime.hour, 8);
    assert.strictEqual(dateTime.minute, 30);
  });
});
