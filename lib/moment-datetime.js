const moment = require('moment-timezone')

module.exports = (timezone, date) => {
  if (timezone) return moment.tz(date || new Date(), timezone)
  else return moment(date || new Date())
}
