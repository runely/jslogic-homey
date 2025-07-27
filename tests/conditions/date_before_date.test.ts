import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/date_before_date';
import { mockConditionCardOptions } from "../lib/mock-options";

describe('Return true when', () => {
  test('"dateOne" is before "dateTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.10.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"dateOne" is equal to "dateTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.09.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateOne" is after "dateTwo"', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.10.2021',
        dateTwo: '01.09.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateOne" is missing', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTwo: '01.09.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTwo" is missing', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateOne" is an empty string', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '',
        dateTwo: '01.10.2021'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTwo" is an empty string', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: ''
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });
});
