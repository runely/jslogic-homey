import type { DateTime } from 'luxon';
import formatDateTime from '../../lib/format-datetime.js';
import hasData from '../../lib/has-data.js';
import luxonDateTime from '../../lib/luxon-datetime.js';
import pad from '../../lib/pad-number.js';
import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

const getFirstYear = (
  today: DateTime,
  firstDate: number,
  firstMonth: number,
  secondDate: number,
  secondMonth: number
): number => {
  const year: number = today.year;
  const month: number = today.month;
  const date: number = today.day;

  if (month === 1 && date <= 15 && firstMonth === 12 && firstDate >= 15 && secondMonth === 1 && secondDate <= 15) {
    return year - 1;
  }

  if (firstMonth < month || (firstMonth === month && firstDate < date)) {
    return year;
  }

  return year;
};

const getSecondYear = (
  today: DateTime,
  firstYear: number,
  firstDate: number,
  firstMonth: number,
  secondDate: number,
  secondMonth: number
): number => {
  const tempYear: number = today.year;
  const year: number = tempYear < firstYear ? firstYear : tempYear;
  const month: number = today.month;
  const date: number = today.day;

  if (secondMonth < firstMonth) {
    if (month < secondMonth || (month === secondMonth && date < secondDate)) {
      return year; // this year
    }

    return year + 1; // next year
  }

  if (secondMonth === firstMonth) {
    if (secondDate < firstDate) {
      return year + 1; // next year
    }

    return year; // same year
  }

  return year; // same year
};

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app, date } = options;
  const { dayOne, dayTwo, monthOne, monthTwo } = options.args as ConditionCardArgs;

  if (
    dayOne === undefined ||
    !hasData<string | number>(dayOne) ||
    dayTwo === undefined ||
    !hasData<string | number>(dayTwo) ||
    monthOne === undefined ||
    !hasData<string>(monthOne) ||
    monthTwo === undefined ||
    !hasData<string>(monthTwo)
  ) {
    app.logError(
      "daymonthnum_between_daymonthnum: Argument 'dayOne' and/or 'monthOne' and/or 'dayTwo' and/or 'monthTwo' missing..."
    );
    throw new Error("'dayOne' and/or 'monthOne' and/or 'dayTwo' and/or 'monthTwo' is missing...");
  }

  const today: DateTime = date !== undefined ? luxonDateTime({ timezone, date }) : luxonDateTime({ timezone });
  const firstDate = Number(dayOne);
  const firstMonth = Number(monthOne) + 1;
  const secondDate = Number(dayTwo);
  const secondMonth = Number(monthTwo) + 1;

  if (firstDate < 0 || firstDate > 31 || secondDate < 0 || secondDate > 31) {
    app.logError("daymonthnum_between_daymonthnum: Argument 'dayOne' and/or 'dayTwo' invalid...");
    throw new Error("'dayOne' and/or 'dayTwo' is invalid");
  }

  const firstYear: number = getFirstYear(today, firstDate, firstMonth, secondDate, secondMonth);
  const secondYear: number = getSecondYear(today, firstYear, firstDate, firstMonth, secondDate, secondMonth);
  const first: DateTime = luxonDateTime({
    timezone,
    date: `${firstYear}-${pad(firstMonth)}-${pad(firstDate)}T${pad(today.hour)}:${pad(today.minute)}:${pad(today.second)}`
  });
  const second: DateTime = luxonDateTime({
    timezone,
    date: `${secondYear}-${pad(secondMonth)}-${pad(secondDate)}T${pad(today.hour)}:${pad(today.minute)}:${pad(today.second)}`
  });

  const formattedToday: string = formatDateTime(today);
  const formattedFirst: string = formatDateTime(first);
  const formattedSecond: string = formatDateTime(second);

  app.log(`daymonthnum_between_daymonthnum: Today: '${formattedToday}'`);
  app.log(`daymonthnum_between_daymonthnum: First: '${formattedFirst}'`);
  app.log(`daymonthnum_between_daymonthnum: Second: '${formattedSecond}'`);

  // today is inside first and second
  if (today.toMillis() >= first.toMillis() && today.toMillis() <= second.toMillis()) {
    app.log(
      `daymonthnum_between_daymonthnum: Today(${formattedToday}) is (>= to first(${formattedFirst}) && <= to second(${formattedSecond})). Inside this year!`
    );
    return true;
  }

  // second is lower than first and today is greater than or equal to first and lower than or equal second (still inside for next year)
  if (
    second.toMillis() < first.toMillis() &&
    today.toMillis() >= first.toMillis() &&
    today.toMillis() <= second.toMillis()
  ) {
    app.log(
      `daymonthnum_between_daymonthnum: Second(${formattedSecond}) is < first(${formattedFirst}) && today(${formattedToday}) is (>= to first(${formattedFirst}) && <= to second(${formattedSecond})). Inside for next year!`
    );
    return true;
  }

  app.log('daymonthnum_between_daymonthnum: Not inside!');
  return false;
};
