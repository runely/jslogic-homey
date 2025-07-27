import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import checkDateTime from '../../lib/check-date-time';
import hasData from '../../lib/has-data';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app } = options;
  const { dateOne, dateTwo, } = options.args as ConditionCardArgs;

  if (dateOne === undefined || !hasData<string>(dateOne) || dateTwo === undefined || !hasData<string>(dateTwo)) {
    app.logError('date_before_date: Argument \'dateOne\' and/or \'dateTwo\' missing...');
    return false;
  }

  return checkDateTime(app, dateOne, dateTwo, 'DateOne', 'DateTwo', 'date_before_date', timezone);
};
