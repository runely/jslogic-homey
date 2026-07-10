import { describe, expect, test } from '@jest/globals';

import getTime from '../lib/get-time.js';
import luxonDateTime from '../lib/luxon-datetime.js';

const now = luxonDateTime({});

describe('Date with', () => {
  test('valid format HH:mm -> Returns luxonDateTime', () => {
    const time = getTime('08:30');
    expect(time.day).toBe(now.day);
    expect(time.month).toBe(now.month);
    expect(time.year).toBe(now.year);
    expect(time.hour).toBe(8);
    expect(time.minute).toBe(30);
  });

  test('valid format HH.mm -> Returns luxonDateTime', () => {
    const time = getTime('08.30');
    expect(time.day).toBe(now.day);
    expect(time.month).toBe(now.month);
    expect(time.year).toBe(now.year);
    expect(time.hour).toBe(8);
    expect(time.minute).toBe(30);
  });
});
