import { ActionCardArgs, ActionCardOptions } from '../../types/types';
import ExtendedHomeyApp from '../../types/ExtendedHomeyApp';

import { DurationInputArg2 } from 'moment-timezone';

import hasData from "../../lib/has-data";
import moment from '../../lib/moment-datetime';

const convertToType = (num: string | number, app: ExtendedHomeyApp): DurationInputArg2 => {
  if ([1, '1'].includes(num)) {
    return 'minutes';
  } else if ([2, '2'].includes(num)) {
    return 'hours';
  } else if ([3, '3'].includes(num)) {
    return 'days';
  } else if ([4, '4'].includes(num)) {
    return 'weeks';
  }

  app.logWarn(`get_formatted_datetime: Type num (${num}) isn't defined. Using minutes!`);
  return 'minutes';
};

export default async (options: ActionCardOptions): Promise<boolean> => {
  const { timezone, app } = options;
  const { format, toAdd, type } = options.args as ActionCardArgs;

  if (type === undefined || !hasData<string | number>(type)) {
    app.logError('get_formatted_datetime: Argument \'type\' missing...');
    throw new Error('Argument \'type\' missing');
  }

  const convertedType = convertToType(type, app);
  const time = moment({ timezone }).add(toAdd, convertedType);
  const token = app.homey.flow.getToken('formatted_datetime');
  if (typeof token.setValue !== 'function') {
    app.logError('get_formatted_datetime: Token "formatted_time" not found');
    return false;
  }

  try {
    await token.setValue(time.format(format));
    return true;
  } catch (ex) {
    app.logError('Failed to set value on formatted_datetime token:', ex);
    return false;
  }
};
