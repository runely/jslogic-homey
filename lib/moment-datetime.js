const moment = require('moment-timezone')

/**
 * @typedef {Object} MomentDateTimeOptions
 * @prop {String} [timezone] The timezone to use on events (IANA)
 * @prop {String} [date] The date to use in moment
 */

/**
 * @param {MomentDateTimeOptions} options
 */
module.exports = (options = {}) => {
  const { timezone, date } = options

  if (timezone) {
    return moment.tz(date || new Date(), timezone)
  }

  return moment(date || new Date())
}
