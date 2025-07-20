export interface MockConditionCardOptions {
  timezone?: string,
  app: MockApp,
  args: any,
  date?: string,
  month?: number,
  day?: number
}

export interface MockTriggerCardOptions {
  args: any,
  state: any,
  app: MockApp
}

export interface MockApp {
  log: (...args: any[]) => void,
  logWarn: (...args: any[]) => void,
  logError: (...args: any[]) => void,
  homey?: MockHomeyApp
}

export interface MockHomeyApp {
  __: (setting: string) => string
}
