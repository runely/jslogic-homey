import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

import checkDateTime from '../../lib/check-date-time'

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, args, app } = options

  if (!args || !args.dateOne || !args.dateTwo) {
    app.logError('date_before_date: Argument \'dateOne\' and/or \'dateTwo\' missing...')
    return false
  }

  return checkDateTime(app, args.dateOne, args.dateTwo, 'DateOne', 'DateTwo', 'date_before_date', timezone)
}
