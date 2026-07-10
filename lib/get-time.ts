import type { DateTime } from 'luxon';

import luxonDateTime from './luxon-datetime.js';
import pad from './pad-number.js';

export default (time: string, timezone?: string): DateTime => {
  const timeSplit: string[] = time.split(/[:.]/);
  const now: DateTime = luxonDateTime({ timezone });

  return luxonDateTime({
    timezone,
    date: `${now.year}-${pad(now.month)}-${pad(now.day)}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00`
  });
};
