import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import checkDateTime from '../../lib/check-date-time';
import hasData from '../../lib/has-data';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { timezone, app } = options;
  const { dateTimeOne, dateTimeTwo } = options.args as ConditionCardArgs;

  if (dateTimeOne === undefined || !hasData<string>(dateTimeOne) || dateTimeTwo === undefined || !hasData<string>(dateTimeTwo)) {
    app.logError('datetime_before_datetime: Argument \'dateTimeOne\' and/or \'dateTimeTwo\' missing...');
    return false;
  }

  return checkDateTime(app, dateTimeOne, dateTimeTwo, 'DateTimeOne', 'DateTimeTwo', 'datetime_before_datetime', timezone);
};
