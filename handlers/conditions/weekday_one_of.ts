import { ConditionCardOptions, Weekday } from "../../types/types";
import { MockConditionCardOptions, MockApp } from "../../types/tests.types";
import ExtendedHomeyApp from "../../types/ExtendedHomeyApp";

import moment from '../../lib/moment-datetime';

const convertWeekdayStringToNum = (weekdayStrings: string[], weekdays: Weekday[]): number[] =>
  weekdays
    .filter(weekDay => weekdayStrings.find(wd => wd.toLowerCase() === weekDay.name.toLowerCase()))
    .map(weekDay => weekDay.number)

const createWeekdaysArray = (app: ExtendedHomeyApp | MockApp): Weekday[] => {
  return [
    {
      name: app.homey?.__('weekdays.weekdaySunday') ?? 'Sunday',
      number: 0
    },
    {
      name: app.homey?.__('weekdays.weekdayMonday') ?? 'Monday',
      number: 1
    },
    {
      name: app.homey?.__('weekdays.weekdayTuesday') ?? 'Tuesday',
      number: 2
    },
    {
      name: app.homey?.__('weekdays.weekdayWednesday') ?? 'Wednesday',
      number: 3
    },
    {
      name: app.homey?.__('weekdays.weekdayThursday') ?? 'Thursday',
      number: 4
    },
    {
      name: app.homey?.__('weekdays.weekdayFriday') ?? 'Friday',
      number: 5
    },
    {
      name: app.homey?.__('weekdays.weekdaySaturday') ?? 'Saturday',
      number: 6
    }
  ]
}

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, args, app, day } = options

  if (!args || !args.weekdays) {
    app.logError('weekday_one_of: Argument \'weekdays\' missing...')
    return false
  }

  const weekdaysArray: Weekday[] = createWeekdaysArray(app)
  const weekdayStrings: string[] = args.weekdays.split(';')
  const weekdays: number[] = convertWeekdayStringToNum(weekdayStrings, weekdaysArray)
  const value: number | undefined = Number.isInteger(day)
    ? day
    : moment({ timezone }).get('weekday')

  app.log('weekday_one_of: Weekdays:', weekdays.join(','), '--', 'WeekdayStrings:', weekdayStrings.join(','))
  app.log("weekday_one_of: Today's weekday:", value)

  const result = weekdays.some(item => value === item)
  app.log("weekday_one_of: Today's weekday is one of:", result)
  return result
}
