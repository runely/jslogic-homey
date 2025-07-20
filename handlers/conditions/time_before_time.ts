import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

import checkDateTime from '../../lib/check-date-time';

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, args, app } = options

  if (!args || !args.timeOne || !args.timeTwo) {
    app.logError('time_before_time: Argument \'timeOne\' or \'timeTwo\' missing...')
    return false
  }

  return checkDateTime(app, args.timeOne, args.timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time', timezone)
}
