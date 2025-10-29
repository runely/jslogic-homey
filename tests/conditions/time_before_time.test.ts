import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/time_before_time';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

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
    expect(result).toBeTruthy();
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
    expect(result).toBeFalsy();
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
    expect(result).toBeFalsy();
  });

  test('"timeOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeTwo: '09:00'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"timeTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"timeOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '',
        timeTwo: '09:00'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"timeTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30',
        timeTwo: ''
      }
    };

    expect((): boolean => check(options)).toThrow();
  });
});
