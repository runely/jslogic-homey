const checkDateTime = require('../../lib/check-date-time')

module.exports = async options => {
  const { timezone, args, app } = options

  if (!args.dateOne || !args.dateTwo) return false

  return checkDateTime(app, timezone, args.dateOne, args.dateTwo, 'DateOne', 'DateTwo', 'date_before_date')
}
