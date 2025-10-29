import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/daynum_between_daynum';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

describe('Return true when', () => {
  test('Day is after "dayOne" this month and before "dayTwo" this month', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 21,
        dayTwo: 28
      },
      day: 25
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Day is before "dayOne" this month and before "dayTwo" this month', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 28,
        dayTwo: 15
      },
      day: 10
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('Day is before "dayOne" and before "dayTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        dayTwo: 20
      },
      day: 10
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dayOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayTwo: 20
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"dayTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19
      }
    };

    expect((): boolean => check(options)).toThrow();
  });
});
