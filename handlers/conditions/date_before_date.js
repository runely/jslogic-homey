const checkDateTime = require('../../lib/check-date-time')

module.exports = async options => {
  const { args, app } = options

  if (!args.dateOne || !args.dateTwo) return false

  return checkDateTime(app, args.dateOne, args.dateTwo, 'DateOne', 'DateTwo', 'date_before_date')
}
