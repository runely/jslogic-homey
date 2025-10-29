import type { Moment } from 'moment-timezone';

export default (moment: Moment): string => moment.format('DD.MM.YY HH:mm:ss');
