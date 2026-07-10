import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/value_empty.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

describe('Return true when', () => {
  test('"value" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ''
      }
    };

    const result = check(options);
    assert.ok(result);
  });

  test('"value" is one whitespace', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ' '
      }
    };

    const result = check(options);
    assert.ok(result);
  });

  test('"value" is 10 whitespace', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: '          '
      }
    };

    const result = check(options);
    assert.ok(result);
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
    assert.ok(!result);
  });

  test('"value" is one word', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'hello'
      }
    };

    const result = check(options);
    assert.ok(!result);
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

    assert.throws(() => check(options));
  });

  test('"value" is undefined', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: undefined
      }
    };

    assert.throws(() => check(options));
  });
});
