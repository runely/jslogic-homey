import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/triggers/date_month_becomes.js';
import type { MockTriggerCardOptions } from '../../types/tests.types';
import { mockTriggerCardOptions } from '../lib/mock-options.js';

describe('Return false when', () => {
  test('"args.date" is missing', () => {
    const options: MockTriggerCardOptions = {
      ...mockTriggerCardOptions,
      args: {
        month: '6'
      },
      state: {
        date: 20,
        month: '6'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"args.month" is missing', () => {
    const options = {
      ...mockTriggerCardOptions,
      args: {
        date: 20
      },
      state: {
        date: 20,
        month: '6'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"state.date" is missing', () => {
    const options = {
      ...mockTriggerCardOptions,
      args: {
        date: 20,
        month: '6'
      },
      state: {
        month: '6'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"state.month" is missing', () => {
    const options = {
      ...mockTriggerCardOptions,
      args: {
        date: 20,
        month: '6'
      },
      state: {
        date: 20
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('state and args is not a match', () => {
    const options = {
      ...mockTriggerCardOptions,
      args: {
        date: 20,
        month: '6'
      },
      state: {
        date: 19,
        month: '6'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });
});

describe('Return true when', () => {
  test('state and args is a match', () => {
    const options = {
      ...mockTriggerCardOptions,
      args: {
        date: 20,
        month: '6'
      },
      state: {
        date: 20,
        month: '6'
      }
    };

    const result = check(options);
    assert.ok(result);
  });
});
