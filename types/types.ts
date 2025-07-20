import ExtendedHomeyApp from "./ExtendedHomeyApp";
import { MockConditionCardOptions } from "./tests.types";

export type ActionCard = (options: ActionCardOptions) => Promise<boolean>

export interface ActionCardOptions {
  timezone?: string,
  args?: any,
  app: ExtendedHomeyApp
}

export type CheckDateTimeType = "date_before_date" | "datetime_before_datetime" | "time_before_time"

export type ConditionCard = (options: ConditionCardOptions | MockConditionCardOptions) => Promise<boolean>

export interface ConditionCardOptions {
  timezone?: string,
  args?: any,
  app: ExtendedHomeyApp,
  date?: string,
  month?: number,
  day?: number
}

export interface FlowCard {
  id: string
}

export interface MomentDateTimeOptions {
  timezone?: string,
  date?: string
}

export interface Timeouts {
  dateMonthBecomes: NodeJS.Timeout | null
}

export type TriggerCard = (options: TriggerCardOptions) => Promise<boolean>

export interface TriggerCardOptions {
  args?: any,
  state?: any,
  app: ExtendedHomeyApp
}

export interface Weekday {
  name: string,
  number: number
}
