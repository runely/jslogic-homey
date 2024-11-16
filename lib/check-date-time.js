'use strict'

const getDate = require('./get-date')
const getTime = require('./get-time')
const getDateTime = require('./get-date-time')

const check = (app, func, parsedOne, parsedTwo, itemOne, itemTwo, descOne, descTwo) => {
  if (isNaN(parsedOne)) {
    app.log(`${func}/check-date-time: ${descOne} '${itemOne}' has invalid format`)
    return false
  }

  if (isNaN(parsedTwo)) {
    app.log(`${func}/check-date-time: ${descTwo} '${itemTwo}' has invalid format`)
    return false
  }

  app.log(`${func}/check-date-time: ${descOne}: '${parsedOne}'`)
  app.log(`${func}/check-date-time: ${descTwo}: '${parsedTwo}'`)
  const result = (parsedOne < parsedTwo)
  app.log(`${func}/check-date-time: Is ${descOne} before ${descTwo}:`, result)
  return result
}

module.exports = (app, timezone, itemOne, itemTwo, descOne, descTwo, func) => {
  if (descOne.includes('DateTime') && descTwo.includes('DateTime')) {
    const parsedOne = getDateTime(itemOne, timezone)
    const parsedTwo = getDateTime(itemTwo, timezone)
    return check(app, func, parsedOne, parsedTwo, itemOne, itemTwo, descOne, descTwo)
  }

  if (descOne.includes('Date') && descTwo.includes('Date')) {
    const parsedOne = getDate(itemOne, timezone)
    const parsedTwo = getDate(itemTwo, timezone)
    return check(app, func, parsedOne, parsedTwo, itemOne, itemTwo, descOne, descTwo)
  }

  if (descOne.includes('Time') && descTwo.includes('Time')) {
    const parsedOne = getTime(itemOne, timezone)
    const parsedTwo = getTime(itemTwo, timezone)
    return check(app, func, parsedOne, parsedTwo, itemOne, itemTwo, descOne, descTwo)
  }
}
