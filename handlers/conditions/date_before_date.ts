import checkDateTime from '../../lib/check-date-time';
import hasData from '../../lib/has-data';
import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app } = options;
  const { dateOne, dateTwo } = options.args as ConditionCardArgs;

  if (dateOne === undefined || !hasData<string>(dateOne) || dateTwo === undefined || !hasData<string>(dateTwo)) {
    app.logError("date_before_date: Argument 'dateOne' and/or 'dateTwo' missing...");
    throw new Error("'dateOne' and/or 'dateTwo' is missing");
  }

  return checkDateTime(app, dateOne, dateTwo, 'DateOne', 'DateTwo', 'date_before_date', timezone);
};
