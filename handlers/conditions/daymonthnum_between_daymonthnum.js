const moment = require('../../lib/moment-datetime')
const pad = require('../../lib/pad-number')

module.exports = async options => {
  const { timezone, args, app } = options

  if (!args.dayOne || !args.monthOne || !args.dayTwo || !args.monthTwo) {
    app.log('daymonthnum_between_daymonthnum: Argument \'dayOne\' or \'monthOne\' or \'dayTwo\' or \'monthTwo\' missing...')
    return false
  }

  const today = moment(timezone)
  const todayYear = today.get('year')
  const firstDate = Number(args.dayOne)
  const firstMonth = Number(args.monthOne) + 1
  const secondDate = Number(args.dayTwo)
  const secondMonth = Number(args.monthTwo) + 1
  const first = moment(timezone, `${todayYear}-${pad(firstMonth)}-${pad(firstDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}`)
  const second = moment(timezone, `${secondMonth < firstMonth || (secondMonth === firstMonth && secondDate < firstDate) ? (todayYear + 1) : todayYear}-${pad(secondMonth)}-${pad(secondDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}`)

  app.log(`daymonthnum_between_daymonthnum: Today: '${today}'`)
  app.log(`daymonthnum_between_daymonthnum: First: '${first}'`)
  app.log(`daymonthnum_between_daymonthnum: Second: '${second}'`)

  // today is inside first and second
  if (today >= first && today <= second) {
    app.log(`daymonthnum_between_daymonthnum: Today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside this year!`)
    return true
  }

  // second is lower than first and today is greater than or equal to first and lower than or equal second (still inside for next year)
  if (second < first && today >= first && today <= second) {
    app.log(`daymonthnum_between_daymonthnum: Second(${second}) is < first(${first}) && today(${today}) is (>= to first(${first}) && <= to second(${second})). Inside for next year!`)
    return true
  }

  app.log('daymonthnum_between_daymonthnum: Not inside!')
  return false
}
