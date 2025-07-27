import { CheckDateTimeType } from '../types/types';
import ExtendedHomeyApp from '../types/ExtendedHomeyApp';
import { MockApp } from '../types/tests.types';

import { Moment } from 'moment-timezone';

import formatMoment from './format-moment';
import getDate from './get-date';
import getDateTime from './get-date-time';
import getTime from './get-time';

const check = (app: ExtendedHomeyApp | MockApp, type: CheckDateTimeType, parsedOne: Moment, parsedTwo: Moment, descOne: string, descTwo: string): boolean => {
  app.log(`${type}/check-date-time: ${descOne}: '${formatMoment(parsedOne)}'`);
  app.log(`${type}/check-date-time: ${descTwo}: '${formatMoment(parsedTwo)}'`);
  const result = (parsedOne < parsedTwo);
  app.log(`${type}/check-date-time: Is ${descOne} before ${descTwo}:`, result);
  return result;
};

export default (app: ExtendedHomeyApp | MockApp, itemOne: string, itemTwo: string, descOne: string, descTwo: string, type: CheckDateTimeType, timezone?: string): boolean => {
  if (descOne.includes('DateTime') && descTwo.includes('DateTime')) {
    const parsedOne: Moment = getDateTime(itemOne, timezone);
    const parsedTwo: Moment = getDateTime(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  if (descOne.includes('Date') && descTwo.includes('Date')) {
    const parsedOne: Moment = getDate(itemOne, timezone);
    const parsedTwo: Moment = getDate(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  if (descOne.includes('Time') && descTwo.includes('Time')) {
    const parsedOne: Moment = getTime(itemOne, timezone);
    const parsedTwo: Moment = getTime(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  app.logError(`descOne and descTwo expected to both include (DateTime || Date || Time) but actually included (${descOne}), (${descTwo})`);
  return false;
};
