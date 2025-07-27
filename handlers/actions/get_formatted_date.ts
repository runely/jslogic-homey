import { ActionCardArgs, ActionCardOptions } from '../../types/types';

import moment from '../../lib/moment-datetime';

export default async (options: ActionCardOptions): Promise<boolean> => {
  const { timezone, app } = options;
  const { daysToAdd, format } = options.args as ActionCardArgs;

  const day = moment({ timezone }).add(daysToAdd, 'days');
  const token = app.homey.flow.getToken('formatted_date');
  if (typeof token.setValue !== 'function') {
    app.logError('get_formatted_date: Token "formatted_date" not found');
    return false;
  }

  try {
    await token.setValue(day.format(format));
    return true;
  } catch (ex) {
    app.logError('Failed to set value on formatted_date token:', ex);
    throw ex;
  }
};
