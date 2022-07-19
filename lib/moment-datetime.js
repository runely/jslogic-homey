const moment = require('moment-timezone')

/**
 * @typedef {Object} MomentDateTimeOptions
 * @prop {String} [timezone] The timezone to use on events (IANA)
 * @prop {Date} [date] The date to momentify
 */

/**
 * @param {MomentDateTimeOptions} options
 */
module.exports = (options = {}) => {
  const { timezone, date } = options
  if (timezone) return moment.tz(date || new Date(), timezone)
  else return moment(date || new Date())
}
