import hasData from '../../lib/has-data';
import moment from '../../lib/moment-datetime';
import type ExtendedHomeyApp from '../../types/ExtendedHomeyApp';
import type { MockApp, MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions, Weekday } from '../../types/types';

const convertWeekdayStringsToNum = (weekdayStrings: string[], weekdays: Weekday[]): number[] =>
  weekdays
    .filter(weekDay => weekdayStrings.find(wd => wd.toLowerCase() === weekDay.name.toLowerCase()))
    .map(weekDay => weekDay.number);

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
  ];
};

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app, day } = options;
  const { weekdays } = options.args as ConditionCardArgs;

  if (weekdays === undefined || !hasData<string>(weekdays)) {
    app.logError("weekday_one_of: Argument 'weekdays' missing...");
    throw new Error("'weekdays' is missing");
  }

  const weekdaysArray: Weekday[] = createWeekdaysArray(app);
  const weekdayStrings: string[] = weekdays.split(';');
  const actualWeekdays: number[] = convertWeekdayStringsToNum(weekdayStrings, weekdaysArray);

  if (actualWeekdays.length !== weekdayStrings.length) {
    app.logError('weekday_one_of: One or more weekdays invalid...');
    throw new Error('One or more weekdays invalid');
  }

  const value: number | undefined = Number.isInteger(day) ? day : moment({ timezone }).get('weekday');

  app.log('weekday_one_of: Weekdays:', actualWeekdays.join(','), '--', 'WeekdayStrings:', weekdayStrings.join(','));
  app.log("weekday_one_of: Today's weekday:", value);

  const result = actualWeekdays.some(item => value === item);
  app.log("weekday_one_of: Today's weekday is one of:", result);
  return result;
};
