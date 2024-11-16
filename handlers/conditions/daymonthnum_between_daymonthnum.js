const moment = require('../../lib/moment-datetime')
const pad = require('../../lib/pad-number')

const getFirstYear = (today, firstDate, firstMonth, secondDate, secondMonth) => {
  const year = today.get('year')
  const month = (today.get('month') + 1)
  const date = today.get('date')

  if (month === 1 && date <= 15 && firstMonth === 12 && firstDate >= 15 && secondMonth === 1 && secondDate <= 15) {
    return year - 1
  }

  if (firstMonth < month || (firstMonth === month && firstDate < date)) {
    return year
  }

  return year
}

const getSecondYear = (today, firstYear, firstDate, firstMonth, secondDate, secondMonth) => {
  const year = today.get('year') < firstYear ? firstYear : today.get('year')
  const month = (today.get('month') + 1)
  const date = today.get('date')

  if (secondMonth < firstMonth) {
    if (month < secondMonth || (month === secondMonth && date < secondDate)) {
      return year // this year
    }

    return year + 1 // next year
  }

  if (secondMonth === firstMonth) {
    if (secondDate < firstDate) {
      return year + 1 // next year
    }

    return year // same year}
  }

  return year // same year
}

module.exports = async options => {
  const { timezone, args, app, date } = options

  if (!args.dayOne || !args.monthOne || !args.dayTwo || !args.monthTwo) {
    app.log('daymonthnum_between_daymonthnum: Argument \'dayOne\' or \'monthOne\' or \'dayTwo\' or \'monthTwo\' missing...')
    return false
  }

  const today = date ? moment({ timezone, date }) : moment({ timezone })
  const firstDate = Number(args.dayOne)
  const firstMonth = Number(args.monthOne) + 1
  const secondDate = Number(args.dayTwo)
  const secondMonth = Number(args.monthTwo) + 1
  const firstYear = getFirstYear(today, firstDate, firstMonth, secondDate, secondMonth)
  const secondYear = getSecondYear(today, firstYear, firstDate, firstMonth, secondDate, secondMonth)
  const first = moment({ timezone, date: `${firstYear}-${pad(firstMonth)}-${pad(firstDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}` })
  const second = moment({ timezone, date: `${secondYear}-${pad(secondMonth)}-${pad(secondDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}` })

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
