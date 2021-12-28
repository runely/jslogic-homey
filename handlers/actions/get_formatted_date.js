const moment = require('../../lib/moment-datetime')

module.exports = async (timezone, tokens, args) => {
  const day = moment(timezone).add(args.daysToAdd, 'days')
  await tokens[0].setValue(day.format(args.format))
  return true
}
