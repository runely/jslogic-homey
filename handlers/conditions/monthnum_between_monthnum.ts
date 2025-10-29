import hasData from '../../lib/has-data';
import moment from '../../lib/moment-datetime';
import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app, month } = options;
  const { monthOne, monthTwo } = options.args as ConditionCardArgs;

  if (monthOne === undefined || !hasData<string>(monthOne) || monthTwo === undefined || !hasData<string>(monthTwo)) {
    app.logError("monthnum_between_monthnum: Argument 'monthOne' or 'monthTwo' missing...");
    throw new Error("'monthOne' and/or 'monthTwo' is missing");
  }

  const today: number = month ?? moment({ timezone }).get('month');
  const first = Number(monthOne);
  const second = Number(monthTwo);

  if (first < 0 || first > 11 || second < 0 || second > 11) {
    app.logError("monthnum_between_monthnum: Argument 'monthOne' and/or 'monthTwo' invalid...");
    throw new Error("'monthOne' and/or 'monthTwo' is invalid");
  }

  app.log(`monthnum_between_monthnum: Today's month: '${today}'`);
  app.log(`monthnum_between_monthnum: First month: '${first}'`);
  app.log(`monthnum_between_monthnum: Second month: '${second}'`);

  // today is inside first and second
  if (today >= first && today <= second) {
    app.log(
      `monthnum_between_monthnum: Today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside this year!`
    );
    return true;
  }

  // second is lower than first and today is greater than or equal to first and lower than or equal second (still inside for next year)
  if (second < first && today >= first && today <= second) {
    app.log(
      `monthnum_between_monthnum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside for next year!`
    );
    return true;
  }

  // second is lower than first and today is greater than first and greater than second (still inside for this year)
  if (second < first && today >= first && today >= second) {
    app.log(
      `monthnum_between_monthnum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && >= to second(${second})). Inside for this year!`
    );
    return true;
  }

  // second is lower than first and today is lower than first and lower than second (still inside for next year)
  if (second < first && today < first && today <= second) {
    app.log(
      `monthnum_between_monthnum: Second(${second}) is < first(${first}) && today(${today}) is (< to first(${first}) && <= to second(${second})). Inside for next year!`
    );
    return true;
  }

  app.log('monthnum_between_monthnum: Not inside!');
  return false;
};
