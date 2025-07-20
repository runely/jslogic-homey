import { ActionCardOptions } from "../../types/types";

import moment from '../../lib/moment-datetime'

export default async (options: ActionCardOptions): Promise<boolean> => {
  const { timezone, args, app } = options
  const day = moment({ timezone }).add(args.daysToAdd as number, 'days')
  const token = app.homey.flow.getToken('formatted_date')
  if (typeof token.setValue !== 'function') {
    app.logError('get_formatted_date: Token "formatted_date" not found')
    return false
  }

  try {
    await token.setValue(day.format(args.format))
    return true
  } catch (ex) {
    app.logError('Failed to set value on formatted_date token:', ex)
    return false
  }
}
