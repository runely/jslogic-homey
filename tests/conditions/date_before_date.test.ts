import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/date_before_date.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

describe('Return true when', () => {
  test('"dateOne" is before "dateTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.10.2021'
      }
    };

    const result = check(options);
    assert.ok(result);
  });
});

describe('Return false when', () => {
  test('"dateOne" is equal to "dateTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.09.2021'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"dateOne" is after "dateTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.10.2021',
        dateTwo: '01.09.2021'
      }
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"dateOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTwo: '01.09.2021'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"dateTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"dateOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '',
        dateTwo: '01.10.2021'
      }
    };

    assert.throws((): boolean => check(options));
  });

  test('"dateTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: ''
      }
    };

    assert.throws((): boolean => check(options));
  });
});
