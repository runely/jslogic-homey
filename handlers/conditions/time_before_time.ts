import checkDateTime from '../../lib/check-date-time';
import hasData from '../../lib/has-data';
import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app } = options;
  const { timeOne, timeTwo } = options.args as ConditionCardArgs;

  if (timeOne === undefined || !hasData<string>(timeOne) || timeTwo === undefined || !hasData<string>(timeTwo)) {
    app.logError("time_before_time: Argument 'timeOne' or 'timeTwo' missing...");
    throw new Error("'timeOne' and/or 'timeTwo' is missing");
  }

  return checkDateTime(app, timeOne, timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time', timezone);
};
