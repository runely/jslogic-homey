import type { Moment } from 'moment-timezone';

import moment from './moment-datetime.js';
import pad from './pad-number.js';

export default (time: string, timezone?: string): Moment => {
  const timeSplit: string[] = time.split(/[:.]/);
  const now: Moment = moment({ timezone });

  return moment({
    timezone,
    date: `${now.get('year')}-${pad(now.get('month') + 1)}-${pad(now.get('date'))}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00`
  });
};
