import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/monthnum_between_monthnum';
import { mockConditionCardOptions } from "../lib/mock-options";

describe('Return true when', () => {
  test('Month is after "monthOne" this month and before "monthTwo" this month', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '4',
        monthTwo: '6'
      },
      month: 5
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Month is after "monthOne" last year and before "monthTwo" this year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '10',
        monthTwo: '3'
      },
      month: 11
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Month is after "monthOne" last year and before "monthTwo" next year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '10',
        monthTwo: '3'
      },
      month: 1
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Month is equal to "monthOne" which is equal to "monthTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '10',
        monthTwo: '10'
      },
      month: 10
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('Month is before "monthOne" and before "monthTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19',
        monthTwo: '20'
      },
      month: 10
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthTwo: '20'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '',
        monthTwo: '20'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19',
        monthTwo: ''
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
