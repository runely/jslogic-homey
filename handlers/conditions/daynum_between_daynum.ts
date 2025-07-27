import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import hasData from "../../lib/has-data";
import moment from '../../lib/moment-datetime';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app, day } = options;
  const { dayOne, dayTwo } = options.args as ConditionCardArgs;

  if (dayOne === undefined || !hasData<string | number>(dayOne) || dayTwo === undefined || !hasData<string | number>(dayTwo)) {
    app.logError('daynum_between_daynum: Argument \'dayOne\' or \'dayTwo\' missing...');
    return false;
  }

  const today: number = day ?? moment({ timezone }).get('date');
  const first = dayOne as number;
  const second = dayTwo as number;

  app.log(`daynum_between_daynum: Today's date: '${today}'`);
  app.log(`daynum_between_daynum: First date: '${first}'`);
  app.log(`daynum_between_daynum: Second date: '${second}'`);

  // today is inside first and second
  if (today >= first && today <= second) {
    app.log(`daynum_between_daynum: Today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside for this month!`);
    return true;
  }

  // second is lower than first and today is greater than first and greater than second (still inside for this month)
  if (second < first && today >= first && today >= second) {
    app.log(`daynum_between_daynum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && >= to second(${second})). Inside for this month!`);
    return true;
  }

  // second is lower than first and today is greater than or equal to first and lower than or equal second (still inside for next month)
  if (second < first && today >= first && today <= second) {
    app.log(`daynum_between_daynum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside for next month!`);
    return true;
  }

  // second is lower than first and today is lower than first and lower than second (still inside for next month)
  if (second < first && today < first && today <= second) {
    app.log(`daynum_between_daynum: Second(${second}) is < first(${first}) && today(${today}) is (< to first(${first}) && <= to second(${second})). Inside for next month!`);
    return true;
  }

  app.log('daynum_between_daynum: Not inside!');
  return false;
};
