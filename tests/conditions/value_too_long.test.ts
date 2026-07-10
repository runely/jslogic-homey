import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/value_too_long.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

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
    assert.ok(result);
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
    assert.ok(!result);
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
    assert.ok(!result);
  });

  test('"value" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        maxLength: 10
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"maxLength" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'hello'
      }
    };

    assert.throws((): boolean => check(options));
  });
});
