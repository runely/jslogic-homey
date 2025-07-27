import { Moment } from 'moment-timezone';

import moment from './moment-datetime';
import pad from './pad-number';

export default (dateTime: string, timezone?: string): Moment => {
  dateTime = dateTime.trim();
  const dateTimeSplit: string[] = dateTime.split(' ');
  const dateSplit: string[] = dateTimeSplit[0].split(/[/.-]/);
  const timeSplit: string[] = dateTimeSplit[(dateTimeSplit.length - 1)].split(/[:.]/);

  return moment({ timezone, date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00` });
};
