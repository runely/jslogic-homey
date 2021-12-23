'use strict'

const getDate = require('./get-date')
const getTime = require('./get-time')
const getDateTime = require('./get-date-time')

module.exports = (app, itemOne, itemTwo, descOne, descTwo, func) => {
  const timezone = app.homey.clock.getTimezone()
  let parsedOne
  let parsedTwo

  if (descOne.includes('DateTime') && descTwo.includes('DateTime')) {
    parsedOne = getDateTime(itemOne, timezone)
    parsedTwo = getDateTime(itemTwo, timezone)
  } else if (descOne.includes('Date') && descTwo.includes('Date')) {
    parsedOne = getDate(itemOne, timezone)
    parsedTwo = getDate(itemTwo, timezone)
  } else if (descOne.includes('Time') && descTwo.includes('Time')) {
    parsedOne = getTime(itemOne, timezone)
    parsedTwo = getTime(itemTwo, timezone)
  }

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
