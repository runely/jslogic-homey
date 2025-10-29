import type { Moment } from 'moment-timezone';

import moment from './moment-datetime';

export default (timezone: string): number => {
  const now: Moment = moment({ timezone });
  const then: Moment = moment({ timezone })
    .set('hours', 0)
    .set('minutes', 0)
    .set('seconds', 0)
    .set('milliseconds', 0)
    .add(1, 'days');
  return then.diff(now, 'milliseconds');
};
