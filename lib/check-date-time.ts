import type { DateTime } from 'luxon';
import type ExtendedHomeyApp from '../types/ExtendedHomeyApp';
import type { MockApp } from '../types/tests.types';
import type { CheckDateTimeType } from '../types/types';

import formatDateTime from './format-datetime.js';
import getDate from './get-date.js';
import getDateTime from './get-date-time.js';
import getTime from './get-time.js';

const check = (
  app: ExtendedHomeyApp | MockApp,
  type: CheckDateTimeType,
  parsedOne: DateTime,
  parsedTwo: DateTime,
  descOne: string,
  descTwo: string
): boolean => {
  if (!parsedOne.isValid || !parsedTwo.isValid) {
    app.logError(`${type}/check-date-time: ${descOne} and/or ${descTwo} invalid`);
    throw new Error(`${descOne} and/or ${descTwo} is invalid`);
  }

  app.log(`${type}/check-date-time: ${descOne}: '${formatDateTime(parsedOne)}'`);
  app.log(`${type}/check-date-time: ${descTwo}: '${formatDateTime(parsedTwo)}'`);
  const result = parsedOne.toMillis() < parsedTwo.toMillis();
  app.log(`${type}/check-date-time: Is ${descOne} before ${descTwo}:`, result);
  return result;
};

export default (
  app: ExtendedHomeyApp | MockApp,
  itemOne: string,
  itemTwo: string,
  descOne: string,
  descTwo: string,
  type: CheckDateTimeType,
  timezone?: string
): boolean => {
  if (descOne.includes('DateTime') && descTwo.includes('DateTime')) {
    const parsedOne: DateTime = getDateTime(itemOne, timezone);
    const parsedTwo: DateTime = getDateTime(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  if (descOne.includes('Date') && descTwo.includes('Date')) {
    const parsedOne: DateTime = getDate(itemOne, timezone);
    const parsedTwo: DateTime = getDate(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  if (descOne.includes('Time') && descTwo.includes('Time')) {
    const parsedOne: DateTime = getTime(itemOne, timezone);
    const parsedTwo: DateTime = getTime(itemTwo, timezone);
    return check(app, type, parsedOne, parsedTwo, itemOne, itemTwo);
  }

  app.logError(
    `descOne and descTwo expected to both include (DateTime || Date || Time) but actually included (${descOne}), (${descTwo})`
  );
  return false;
};
