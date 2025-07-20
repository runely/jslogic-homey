import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

import { Moment } from 'moment-timezone'

import moment from '../../lib/moment-datetime'
import pad from '../../lib/pad-number'

const getFirstYear = (today: Moment, firstDate: number, firstMonth: number, secondDate: number, secondMonth: number): number => {
  const year: number = today.get('year')
  const month: number = today.get('month') + 1
  const date: number = today.get('date')

  if (month === 1 && date <= 15 && firstMonth === 12 && firstDate >= 15 && secondMonth === 1 && secondDate <= 15) {
    return year - 1
  }

  if (firstMonth < month || (firstMonth === month && firstDate < date)) {
    return year
  }

  return year
}

const getSecondYear = (today: Moment, firstYear: number, firstDate: number, firstMonth: number, secondDate: number, secondMonth: number): number => {
  const tempYear: number = today.get('year')
  const year: number = tempYear < firstYear ? firstYear : tempYear
  const month: number = today.get('month') + 1
  const date: number = today.get('date')

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

    return year // same year
  }

  return year // same year
}

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { timezone, args, app, date } = options

  if (!args || !args.dayOne || !args.monthOne || !args.dayTwo || !args.monthTwo) {
    app.logError('daymonthnum_between_daymonthnum: Argument \'dayOne\' or \'monthOne\' or \'dayTwo\' or \'monthTwo\' missing...')
    return false
  }

  const today: Moment = date ? moment({ timezone, date }) : moment({ timezone })
  const firstDate = Number(args.dayOne)
  const firstMonth = Number(args.monthOne) + 1
  const secondDate = Number(args.dayTwo)
  const secondMonth = Number(args.monthTwo) + 1
  const firstYear: number = getFirstYear(today, firstDate, firstMonth, secondDate, secondMonth)
  const secondYear: number = getSecondYear(today, firstYear, firstDate, firstMonth, secondDate, secondMonth)
  const first: Moment = moment({ timezone, date: `${firstYear}-${pad(firstMonth)}-${pad(firstDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}` })
  const second: Moment = moment({ timezone, date: `${secondYear}-${pad(secondMonth)}-${pad(secondDate)}T${pad(today.get('hour'))}:${pad(today.get('minute'))}:${pad(today.get('second'))}` })

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
