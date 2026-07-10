import { describe, expect, test } from '@jest/globals';

import getDate from '../lib/get-date.js';

describe('Date with', () => {
  test('valid format dd.MM.yyyy -> Returns DateTime', () => {
    const date = getDate('01.12.2021');
    expect(date.day).toBe(1);
    expect(date.month).toBe(12);
    expect(date.year).toBe(2021);
  });

  test('valid format dd/MM/yyyy -> Returns DateTime', () => {
    const date = getDate('01/12/2021');
    expect(date.day).toBe(1);
    expect(date.month).toBe(12);
    expect(date.year).toBe(2021);
  });

  test('valid format dd-MM-yyyy -> Returns DateTime', () => {
    const date = getDate('01-12-2021');
    expect(date.day).toBe(1);
    expect(date.month).toBe(12);
    expect(date.year).toBe(2021);
  });
});
