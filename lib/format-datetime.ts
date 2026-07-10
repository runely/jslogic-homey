import type { DateTime } from 'luxon';

export default (dt: DateTime): string => dt.toFormat('dd.MM.yy HH:mm:ss');
