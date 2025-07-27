import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/daymonthnum_between_daymonthnum';
import { mockConditionCardOptions } from "../lib/mock-options";

describe('Return true when', () => {
  test('Today is after "dayMonthOne" this year and before "dayMonthTwo" next year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 28,
        monthOne: '11',
        dayTwo: 3,
        monthTwo: '0'
      },
      date: '2021-12-29T08:30:00'
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Today is after "dayMonthOne" last year and before "dayMonthTwo" this year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 28,
        monthOne: '11',
        dayTwo: 3,
        monthTwo: '0'
      },
      date: '2022-01-02T08:30:00'
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Today is after "dayMonthOne" and before "dayMonthTwo" inside same year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        dayTwo: 21,
        monthTwo: '11'
      },
      date: '2021-12-20T08:30:00'
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });

  test('Today is equal to "dayMonthOne" which is equal to "dayMonthTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        dayTwo: 19,
        monthTwo: '11'
      },
      date: '2021-12-19T08:30:00'
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('Today is after "dayMonthOne" and "dayMonthTwo"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        dayTwo: 20,
        monthTwo: '11'
      },
      date: '2021-12-21T08:30:00'
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('Today is before "dayMonthOne" this year and before "dayMonthTwo" next year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 28,
        monthOne: '11',
        dayTwo: 31,
        monthTwo: '4'
      },
      date: '2022-06-30T08:30:00'
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dayOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '11',
        dayTwo: 20,
        monthTwo: '11'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        dayTwo: 20,
        monthTwo: '11'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dayTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        monthTwo: '11'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        dayTwo: 20
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '',
        dayTwo: 20,
        monthTwo: '11'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"monthTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dayOne: 19,
        monthOne: '11',
        dayTwo: 20,
        monthTwo: ''
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
