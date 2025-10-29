import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/triggers/date_month_becomes';
import type { MockTriggerCardOptions } from '../../types/tests.types';
import { mockTriggerCardOptions } from '../lib/mock-options';

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

    expect((): boolean => check(options)).toThrow();
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

    expect((): boolean => check(options)).toThrow();
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

    expect((): boolean => check(options)).toThrow();
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

    expect((): boolean => check(options)).toThrow();
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
    expect(result).toBeFalsy();
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
    expect(result).toBeTruthy();
  });
});
