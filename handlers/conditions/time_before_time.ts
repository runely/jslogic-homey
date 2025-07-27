import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import checkDateTime from '../../lib/check-date-time';
import hasData from '../../lib/has-data';

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, app } = options;
  const { timeOne, timeTwo } = options.args as ConditionCardArgs;

  if (timeOne === undefined || !hasData<string>(timeOne) || timeTwo === undefined || !hasData<string>(timeTwo)) {
    app.logError('time_before_time: Argument \'timeOne\' or \'timeTwo\' missing...');
    return false;
  }

  return checkDateTime(app, timeOne, timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time', timezone);
};
