import { MomentDateTimeOptions } from "../types/types";

import moment from 'moment-timezone'
import { Moment } from 'moment-timezone'

export default (options: MomentDateTimeOptions): Moment => {
  const { timezone, date } = options

  if (timezone) {
    return moment.tz(date || new Date(), timezone)
  }

  return moment(date || new Date())
}
