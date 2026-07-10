import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import check from '../../handlers/conditions/weekday_one_of.js';
import { weekdays } from '../../locales/en.json';
import type { MockConditionCardOptions } from '../../types/tests.types';
import { mockConditionCardOptions } from '../lib/mock-options.js';

mockConditionCardOptions.app.homey = {
  __: (setting: string): string => {
    const name: string = setting.split('.')[1];
    const weekdayKeys: string[] = Object.keys(weekdays);
    const indexOfName: number = weekdayKeys.indexOf(name);

    return Object.values(weekdays)[indexOfName];
  }
};

const weekdayStrings = Object.values(weekdays);

describe('Return true when', () => {
  weekdayStrings.forEach((weekday, index) => {
    test(`"Weekday" is ${weekday} (${index}) and ${weekday} is one of the selected weekdays`, () => {
      const options: MockConditionCardOptions = {
        ...mockConditionCardOptions,
        args: {
          weekdays: weekdayStrings.join(';')
        },
        day: index
      };

      const result = check(options);
      assert.ok(result);
    });
  });

  test('"Weekday" is Monday and Monday is the only selected weekday', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        weekdays: ['Monday'].join(';')
      },
      day: 1
    };

    const result = check(options);
    assert.ok(result);
  });

  test('"Weekday" is Tuesday and Monday and Tuesday is the only selected weekdays', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        weekdays: ['Monday', 'Tuesday'].join(';')
      },
      day: 2
    };

    const result = check(options);
    assert.ok(result);
  });
});

describe('Return false when', () => {
  weekdayStrings.forEach((weekday, index) => {
    test(`"Weekday" is ${weekday} (${index}) and ${weekday} is NOT one of the selected weekdays`, () => {
      const options: MockConditionCardOptions = {
        ...mockConditionCardOptions,
        args: {
          weekdays: weekdayStrings.filter(w => w !== weekday).join(';')
        },
        day: index
      };

      const result = check(options);
      assert.ok(!result);
    });
  });

  test('"Weekday" is Monday and Tuesday is the only selected weekday', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        weekdays: ['Tuesday'].join(';')
      },
      day: 1
    };

    const result = check(options);
    assert.ok(!result);
  });

  test('"weekdays" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {},
      day: 1
    };

    assert.throws((): boolean => check(options));
  });

  test('"weekdays" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        weekdays: ''
      },
      day: 1
    };

    assert.throws((): boolean => check(options));
  });
});
