import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/time_before_time.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

describe('Return true when', () => {
  test('"timeOne" is before "timeTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30',
        timeTwo: '09:00'
      }
    };

    const result = check(options);
    assert.ok(result);
  });
});

describe('Return false when', () => {
  test('"timeOne" is equal to "timeTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30',
        timeTwo: '08:30'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"timeOne" is after "timeTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '09:00',
        timeTwo: '08:30'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"timeOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeTwo: '09:00'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"timeTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"timeOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '',
        timeTwo: '09:00'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"timeTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30',
        timeTwo: ''
      }
    };

    assert.throws((): boolean => check(options));
  });
});
