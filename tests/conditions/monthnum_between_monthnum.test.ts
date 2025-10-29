import { describe, expect, test } from '@jest/globals';
import check from '../../handlers/conditions/monthnum_between_monthnum';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options';

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

  test('Month is after "monthOne" this year and before "monthTwo" next year', () => {
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

  test('Month is after "monthOne" next year and before "monthTwo" next year', () => {
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

  test('Month is after "monthOne" next year and equal to "monthTwo" next year', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '7',
        monthTwo: '6'
      },
      month: 6
    };

    const result = check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"monthOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthTwo: '20'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"monthTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"monthOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '',
        monthTwo: '20'
      }
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('"monthTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19',
        monthTwo: ''
      }
    };

    expect((): boolean => check(options)).toThrow();
  });
});

describe('Throw an error when', () => {
  test('monthOne is more than actual months"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '19',
        monthTwo: '10'
      },
      month: 10
    };

    expect((): boolean => check(options)).toThrow();
  });

  test('monthTwo is more than actual months"', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        monthOne: '10',
        monthTwo: '19'
      },
      month: 10
    };

    expect((): boolean => check(options)).toThrow();
  });
});
