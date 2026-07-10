import type { DateTime } from 'luxon';

import luxonDateTime from './luxon-datetime.js';

export default (timezone: string): number => {
  const now: DateTime = luxonDateTime({ timezone });
  const then: DateTime = luxonDateTime({ timezone })
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .plus({ days: 1 });
  return then.diff(now).milliseconds;
};
