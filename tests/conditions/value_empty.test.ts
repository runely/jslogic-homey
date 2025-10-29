import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/value_empty';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

describe('Return true when', () => {
  test('"value" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ''
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"value" is one whitespace', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ' '
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"value" is 10 whitespace', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: '          '
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"value" is one letter', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'h'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"value" is one word', () => {
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

describe('Throws an error when', () => {
  test('"value" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false'
      }
    };

    expect(() => check(options)).toThrow();
  });

  test('"value" is undefined', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: undefined
      }
    };

    expect(() => check(options)).toThrow();
  });
});
