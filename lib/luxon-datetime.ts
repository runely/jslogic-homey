import { DateTime } from 'luxon';
import type { DateTimeOptions } from '../types/types';

export default (options: DateTimeOptions): DateTime => {
  const { timezone, date } = options;

  if (date !== undefined) {
    return timezone !== undefined ? DateTime.fromISO(date, { zone: timezone }) : DateTime.fromISO(date);
  }

  return timezone !== undefined ? DateTime.now().setZone(timezone) : DateTime.now();
};
