const checkDateTime = require('../../lib/check-date-time')

module.exports = async options => {
  const { args, app } = options

  if (!args.timeOne || !args.timeTwo) return false

  return checkDateTime(app, args.timeOne, args.timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time')
}
