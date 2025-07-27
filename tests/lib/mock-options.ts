import { MockConditionCardOptions, MockTriggerCardOptions } from '../../types/tests.types';

const mockConditionCardOptions: MockConditionCardOptions = {
  timezone: 'Europe/Oslo',
  app: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (...args: any[]) => console.log(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logWarn: (...args: any[]) => console.warn(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logError: (...args: any[]) => console.error(args)
  },
  args: {}
};

const mockTriggerCardOptions: MockTriggerCardOptions = {
  args: {},
  state: {},
  app: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (...args: any[]) => console.log(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logWarn: (...args: any[]) => console.warn(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logError: (...args: any[]) => console.error(args)
  }
};

export {
  mockConditionCardOptions,
  mockTriggerCardOptions
};
