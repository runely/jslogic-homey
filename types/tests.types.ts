import { ConditionCardArgs, TriggerCardArgs, TriggerCardState } from './types';

export interface MockConditionCardOptions {
  timezone?: string
  app: MockApp
  args: ConditionCardArgs
  date?: string | undefined
  month?: number | undefined
  day?: number
}

export interface MockTriggerCardOptions {
  args: TriggerCardArgs
  state: TriggerCardState
  app: MockApp
}

export interface MockApp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logWarn: (...args: any[]) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logError: (...args: any[]) => void
  homey?: MockHomeyApp
}

export interface MockHomeyApp {
  __: (setting: string) => string
}
