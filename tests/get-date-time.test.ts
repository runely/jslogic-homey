import { describe, expect, test } from '@jest/globals';

import getDateTime from '../lib/get-date-time.js';

describe('DateTime with', () => {
  test('valid format dd.MM.yyyy HH:mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01.12.2021 08:30');
    expect(dateTime.day).toBe(1);
    expect(dateTime.month).toBe(12);
    expect(dateTime.year).toBe(2021);
    expect(dateTime.hour).toBe(8);
    expect(dateTime.minute).toBe(30);
  });

  test('valid format dd/MM/yyyy HH.mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01/12/2021 08.30');
    expect(dateTime.day).toBe(1);
    expect(dateTime.month).toBe(12);
    expect(dateTime.year).toBe(2021);
    expect(dateTime.hour).toBe(8);
    expect(dateTime.minute).toBe(30);
  });

  test('valid format dd-MM-yyyy HH:mm -> Returns DateTime', () => {
    const dateTime = getDateTime('01-12-2021 08:30');
    expect(dateTime.day).toBe(1);
    expect(dateTime.month).toBe(12);
    expect(dateTime.year).toBe(2021);
    expect(dateTime.hour).toBe(8);
    expect(dateTime.minute).toBe(30);
  });
});
