import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/date_before_date';
import { mockConditionCardOptions } from "../lib/mock-options";

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
    expect(result).toBeTruthy();
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
    expect(result).toBeFalsy();
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
    expect(result).toBeFalsy();
  });

  test('"dateOne" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateTwo: '01.09.2021'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTwo" is missing', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dateOne" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '',
        dateTwo: '01.10.2021'
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });

  test('"dateTwo" is an empty string', () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: ''
      }
    };

    const result = check(options);
    expect(result).toBeFalsy();
  });
});
