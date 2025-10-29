import type { MockConditionCardOptions, MockTriggerCardOptions } from '../../types/tests.types';

const mockConditionCardOptions: MockConditionCardOptions = {
  timezone: 'Europe/Oslo',
  app: {
    log: (...args: unknown[]) => console.log(args),
    logWarn: (...args: unknown[]) => console.warn(args),
    logError: (...args: unknown[]) => console.error(args)
  },
  args: {}
};

const mockTriggerCardOptions: MockTriggerCardOptions = {
  args: {},
  state: {},
  app: {
    log: (...args: unknown[]) => console.log(args),
    logWarn: (...args: unknown[]) => console.warn(args),
    logError: (...args: unknown[]) => console.error(args)
  }
};

export { mockConditionCardOptions, mockTriggerCardOptions };
