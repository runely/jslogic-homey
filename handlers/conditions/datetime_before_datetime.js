const checkDateTime = require('../../lib/check-date-time')

module.exports = async options => {
  const { args, app } = options

  if (!args.dateTimeOne || !args.dateTimeTwo) return false

  return checkDateTime(app, args.dateTimeOne, args.dateTimeTwo, 'DateTimeOne', 'DateTimeTwo', 'datetime_before_datetime')
}
