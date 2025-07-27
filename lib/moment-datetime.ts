import { MomentDateTimeOptions } from '../types/types';

import moment, { Moment } from 'moment-timezone';

export default (options: MomentDateTimeOptions): Moment => {
  const { timezone, date } = options;

  if (timezone !== undefined) {
    return moment.tz(date ?? new Date(), timezone);
  }

  return moment(date ?? new Date());
};
