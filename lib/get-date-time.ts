import type { DateTime } from 'luxon';

import luxonDateTime from './luxon-datetime.js';
import pad from './pad-number.js';

export default (dateTime: string, timezone?: string): DateTime => {
  dateTime = dateTime.trim();
  const dateTimeSplit: string[] = dateTime.split(' ');
  const dateSplit: string[] = dateTimeSplit[0].split(/[/.-]/);
  const timeSplit: string[] = dateTimeSplit[dateTimeSplit.length - 1].split(/[:.]/);

  return luxonDateTime({
    timezone,
    date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00`
  });
};
