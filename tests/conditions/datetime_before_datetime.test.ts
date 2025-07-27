import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/datetime_before_datetime';
import { mockConditionCardOptions } from "../lib/mock-options";

describe('Return true when', () => {
  test('"dateTimeOne" is before "dateTimeTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: '01.09.2021 09:00'
      }
    };

    const result = await check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"dateTimeOne" is equal to "dateTimeTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: '01.09.2021 08:30'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTimeOne" is after "dateTimeTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '01.09.2021 09:00',
        dateTimeTwo: '01.09.2021 08:30'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTimeOne" is missing', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeTwo: '01.09.2021 09:00'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTimeTwo" is missing', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTimeOne" is an empty string', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '',
        dateTimeTwo: '01.10.2021 09:00'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTimeTwo" is an empty string', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: ''
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });
});
