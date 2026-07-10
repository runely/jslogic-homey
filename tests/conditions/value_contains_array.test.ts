import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/value_contains_array.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

describe('Return true when', () => {
  test('"value" contains one off array items case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['HELL', 'hell', 'HELLO', 'hi'].join(';'),
        casesenitive: 'true',
        value: 'hello'
      }
    };

    const result = check(options);
    assert.ok(result);
  });

  test('"value" contains one off array items not case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['HELL', 'hell', 'HELLO', 'hi'].join(';'),
        casesenitive: 'false',
        value: 'hello'
      }
    };

    const result = check(options);
    assert.ok(result);
  });
});

describe('Return false when', () => {
  test('"value" does not contain one off array items case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'true',
        value: 'hello'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"value" does not contain one off array items not case sensitive', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false',
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
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"array" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        casesenitive: 'false',
        value: 'hello'
      }
    };

    assert.throws((): boolean => check(options));
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

    assert.throws((): boolean => check(options));
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

    assert.throws((): boolean => check(options));
  });
});
