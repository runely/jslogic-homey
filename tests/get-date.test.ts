import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import getDate from '../lib/get-date.js';

describe('Date with', () => {
  test('valid format dd.MM.yyyy -> Returns DateTime', () => {
    const date = getDate('01.12.2021');
    assert.strictEqual(date.day, 1);
    assert.strictEqual(date.month, 12);
    assert.strictEqual(date.year, 2021);
  });

  test('valid format dd/MM/yyyy -> Returns DateTime', () => {
    const date = getDate('01/12/2021');
    assert.strictEqual(date.day, 1);
    assert.strictEqual(date.month, 12);
    assert.strictEqual(date.year, 2021);
  });

  test('valid format dd-MM-yyyy -> Returns DateTime', () => {
    const date = getDate('01-12-2021');
    assert.strictEqual(date.day, 1);
    assert.strictEqual(date.month, 12);
    assert.strictEqual(date.year, 2021);
  });
});
