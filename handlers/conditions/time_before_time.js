const checkDateTime = require('../../lib/check-date-time')

module.exports = async options => {
  const { timezone, args, app } = options

  if (!args.timeOne || !args.timeTwo) {
    return false
  }

  return checkDateTime(app, timezone, args.timeOne, args.timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time')
}
