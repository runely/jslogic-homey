import { describe, test, expect } from '@jest/globals';
import { MockConditionCardOptions } from "../../types/tests.types";

import check from '../../handlers/conditions/value_empty';
import { mockConditionCardOptions } from "../lib/mock-options";

describe('Return true when', () => {
  test('"value" is an empty string', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ''
      }
    };

    const result = await check(options);
    expect(result).toBeTruthy();
  });

  test('"value" is one whitespace', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: ' '
      }
    };

    const result = await check(options);
    expect(result).toBeTruthy();
  });

  test('"value" is 10 whitespace', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: '          '
      }
    };

    const result = await check(options);
    expect(result).toBeTruthy();
  });
});

describe('Return false when', () => {
  test('"value" is one letter', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'h'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"value" is one word', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: 'hello'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"value" is missing', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false'
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  test('"value" is undefined', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: undefined
      }
    };

    const result = await check(options);
    expect(result).toBeFalsy();
  });

  // TODO: What happens if a token is set to null ??? 
  /* test('"value" is null', async () => {
    const options: MockConditionCardOptions = {
      ...mockConditionCardOptions,
      args: {
        value: null
      }
    }

    const result = await check(options)
    expect(result).toBeFalsy()
  }) */
});
