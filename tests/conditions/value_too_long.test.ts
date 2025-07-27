import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from '../../types/tests.types';

import check from '../../handlers/conditions/value_too_long';
import { mockConditionCardOptions } from '../lib/mock-options';

describe('Return true when', () => {
  test('Length of "value" is shorter than "maxLength"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        maxLength: 10,
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('Length of "value" is greater than "maxLength"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        maxLength: 4,
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('Length of "value" is equal to "maxLength"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        maxLength: 5,
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"value" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        maxLength: 10
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"maxLength" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
