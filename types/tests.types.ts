import type { ConditionCardArgs, TriggerCardArgs, TriggerCardState } from './types';

export interface MockConditionCardOptions {
  timezone?: string;
  app: MockApp;
  args: ConditionCardArgs;
  date?: string | undefined;
  month?: number | undefined;
  day?: number;
}

export interface MockTriggerCardOptions {
  args: TriggerCardArgs;
  state: TriggerCardState;
  app: MockApp;
}

export interface MockApp {
  log: (...args: unknown[]) => void;
  logWarn: (...args: unknown[]) => void;
  logError: (...args: unknown[]) => void;
  homey?: MockHomeyApp;
}

export interface MockHomeyApp {
  __: (setting: string) => string;
}
