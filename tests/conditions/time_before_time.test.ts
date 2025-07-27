import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from '../../types/tests.types';

import check from '../../handlers/conditions/time_before_time';
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

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"timeTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"timeOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '',
        timeTwo: '09:00'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"timeTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        timeOne: '08:30',
        timeTwo: ''
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
