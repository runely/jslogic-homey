import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

import checkDateTime from '../../lib/check-date-time'

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, args, app } = options

  if (!args || !args.dateTimeOne || !args.dateTimeTwo) {
    app.logError('datetime_before_datetime: Argument \'dateTimeOne\' and/or \'dateTimeTwo\' missing...')
    return false
  }

  return checkDateTime(app, args.dateTimeOne, args.dateTimeTwo, 'DateTimeOne', 'DateTimeTwo', 'datetime_before_datetime', timezone)
}
