import type { Moment } from 'moment-timezone';

import moment from './moment-datetime';
import pad from './pad-number';

export default (date: string, timezone?: string): Moment => {
  const dateSplit: string[] = date.split(/[/.-]/);

  return moment({ timezone, date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}` });
};
