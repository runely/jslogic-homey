import moment, { type Moment } from 'moment-timezone';
import type { MomentDateTimeOptions } from '../types/types';

export default (options: MomentDateTimeOptions): Moment => {
  const { timezone, date } = options;

  if (timezone !== undefined) {
    return moment.tz(date ?? new Date(), timezone);
  }

  return moment(date ?? new Date());
};
