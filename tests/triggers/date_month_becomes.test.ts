import { describe, test, expect } from '@jest/globals';
import { MockTriggerCardOptions } from '../../types/tests.types';

import check from '../../handlers/triggers/date_month_becomes';
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
    
    const result = check(options);
    expect(result).toBeFalsy();
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

    const result = check(options);
    expect(result).toBeFalsy();
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

    const result = check(options);
    expect(result).toBeFalsy();
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

    const result = check(options);
    expect(result).toBeFalsy();
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
