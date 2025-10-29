import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/value_in_array';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

describe('Return true when', () => {
  test('"value" equals one off array items case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['HELL', 'hell', 'HELLO', 'hello'].join(';'),
        casesenitive: 'true',
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('"value" equals one off array items not case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['HELL', 'hell', 'HELLO', 'hi'].join(';'),
        casesenitive: 'false',
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"value" does not equal one off array items case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'true',
        value: 'hello'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"value" does not equal one off array items not case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false',
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
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"array" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        casesenitive: 'false',
        value: 'hello'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"value" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false',
        value: ''
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"array" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: '',
        casesenitive: 'false',
        value: 'hello'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });
});
