import type ExtendedHomeyApp from './ExtendedHomeyApp';
import type { MockConditionCardOptions } from './tests.types';

export type ActionCard = (options: ActionCardOptions) => Promise<boolean>;

export interface ActionCardArgs {
  daysToAdd?: number;
  format?: string;
  toAdd?: number;
  type?: string | number;
}

export interface ActionCardOptions {
  timezone?: string;
  args?: ActionCardArgs;
  app: ExtendedHomeyApp;
}

export type CheckDateTimeType = 'date_before_date' | 'datetime_before_datetime' | 'time_before_time';

export type ConditionCard = (options: ConditionCardOptions | MockConditionCardOptions) => Promise<boolean>;

export interface ConditionCardArgs {
  array?: string;
  casesenitive?: string;
  dateOne?: string;
  dateTwo?: string;
  dateTimeOne?: string;
  dateTimeTwo?: string;
  dayOne?: string | number;
  dayTwo?: string | number;
  includes?: string;
  maxLength?: number;
  monthOne?: string;
  monthTwo?: string;
  timeOne?: string;
  timeTwo?: string;
  value?: string;
  value1?: number;
  value2?: number;
  value3?: number;
  weekdays?: string;
}

export interface ConditionCardOptions {
  timezone?: string;
  args?: ConditionCardArgs;
  app: ExtendedHomeyApp;
  date?: string;
  month?: number;
  day?: number;
}

export interface FlowCard {
  id: string;
}

export interface MomentDateTimeOptions {
  timezone?: string | undefined;
  date?: string | undefined;
}

export interface Timeouts {
  dateMonthBecomes: NodeJS.Timeout | null;
}

export type TriggerCard = (options: TriggerCardOptions) => Promise<boolean>;

export interface TriggerCardArgs {
  date?: number;
  month?: string;
}

export interface TriggerCardOptions {
  args?: TriggerCardArgs;
  state?: TriggerCardState;
  app: ExtendedHomeyApp;
}

export interface TriggerCardState {
  date?: number;
  month?: string;
}

export interface Weekday {
  name: string;
  number: number;
}
