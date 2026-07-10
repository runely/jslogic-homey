import type { DateTime } from 'luxon';

import luxonDateTime from './luxon-datetime.js';
import pad from './pad-number.js';

export default (date: string, timezone?: string): DateTime => {
  const dateSplit: string[] = date.split(/[/.-]/);

  return luxonDateTime({ timezone, date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}` });
};
