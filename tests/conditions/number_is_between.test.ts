import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/number_is_between';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

describe('Return true when', () => {
  test('"Includes" and "value1" is equal to "value2" but lower than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 1,
        value2: 1,
        value3: 2,
        includes: 'true'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"Includes" and "value1" is greater than "value2" but equal to "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 1,
        value2: 0,
        value3: 1,
        includes: 'true'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"Includes" and "value1" is equal to "value2" and equal to "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 1,
        value2: 1,
        value3: 1,
        includes: 'true'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"Not includes" and "value1" is greater than "value2" and lower than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 1,
        value2: 0,
        value3: 2,
        includes: 'false'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"Includes" and "value1" is greater "value2" and greater than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 3,
        value2: 1,
        value3: 2,
        includes: 'true'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"Includes" and "value1" is lower than "value2" and lower than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 0,
        value2: 1,
        value3: 2,
        includes: 'true'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"Not includes" and "value1" is greater "value2" and greater than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 3,
        value2: 1,
        value3: 2,
        includes: 'false'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"Not includes" and "value1" is equal to "value2" and lower than "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 2,
        value2: 2,
        value3: 3,
        includes: 'false'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"Not includes" and "value1" is greater than "value2" and equal to "value3"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value1: 2,
        value2: 1,
        value3: 2,
        includes: 'false'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
