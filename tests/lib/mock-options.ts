import { MockConditionCardOptions, MockTriggerCardOptions } from "../../types/tests.types";

const mockConditionCardOptions: MockConditionCardOptions = {
  timezone: 'Europe/Oslo',
  app: {
    log: (...args: any[]) => console.log(args),
    logWarn: (...args: any[]) => console.warn(args),
    logError: (...args: any[]) => console.error(args)
  },
  args: {}
}

const mockTriggerCardOptions: MockTriggerCardOptions = {
  args: {},
  state: {},
  app: {
    log: (...args: any[]) => console.log(args),
    logWarn: (...args: any[]) => console.warn(args),
    logError: (...args: any[]) => console.error(args)
  }
}

export {
  mockConditionCardOptions,
  mockTriggerCardOptions
}
