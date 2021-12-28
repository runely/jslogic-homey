const moment = require('../../lib/moment-datetime')

module.exports = async options => {
  const { timezone, args, app } = options

  if (!args.monthOne || !args.monthTwo) {
    app.log('monthnum_between_monthnum: Argument \'monthOne\' or \'monthTwo\' missing...')
    return false
  }

  const today = moment(timezone).get('month')
  const first = Number(args.monthOne)
  const second = Number(args.monthTwo)

  app.log(`monthnum_between_monthnum: Todays month: '${today}'`)
  app.log(`monthnum_between_monthnum: First  month: '${first}'`)
  app.log(`monthnum_between_monthnum: Second month: '${second}'`)

  // today is inside first and second
  if (today >= first && today <= second) {
    app.log(`monthnum_between_monthnum: Today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside this year!`)
    return true
  }

  // second is lower than first and today is greater than or equal to first and lower than or equal second (still inside for next year)
  if (second < first && today >= first && today <= second) {
    app.log(`monthnum_between_monthnum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside for next year!`)
    return true
  }

  app.log('monthnum_between_monthnum: Not inside!')
  return false
}
